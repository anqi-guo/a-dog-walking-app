import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Image } from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { getLocation } from "../components/LocationManager";
import MapComponent from "../components/MapComponent";
import { WalkScreenTopButton, WalkScreenBottomButton } from "../components/ButtonComponent";
import { useWalk } from "../components/WalkContext";
import { set } from "firebase/database";

//Walk screen allows the user to record walk route on a map, walk duration and time. 
//The user can also take photos while walk the dog, the photo will be pined on the route map. 
export default function Walk() {
  // const [positions, setPositions] = useState([]);
  // const [currentLocation, setCurrentLocation] = useState(null);
  // const [isTracking, setIsTracking] = useState(false);
  const { 
    positions, setPositions, 
    currentLocation, setCurrentLocation, 
    isTracking, setIsTracking,
    pees, setPees,
    poops, setPoops, 
  } = useWalk();
  const mapRef = useRef(null);
  const navigation = useNavigation();

  // Get the current location and start tracking
  useEffect(() => {
    let intervalId;
  
    const fetchData = async () => {
      await getLocation(setCurrentLocation, setPositions, isTracking);
      if (isTracking) {
        intervalId = setInterval(async () => {
          await getLocation(setCurrentLocation, setPositions, isTracking);
        }, 1000);
      }
    };
  
    fetchData();
  
    return () => clearInterval(intervalId);
  }, [isTracking]);

  // Function to toggle tracking
  const toggleTrackingHandler = async() => {
    if (isTracking) { // If the user stops the walk
      if (positions.length < 2) {
        alert("You need to walk more to record a walk!");
      } 
      navigation.navigate("Monitor", { positions, isNew: true });
    } 
    setPositions([]);
    setIsTracking((prevIsTracking) => !prevIsTracking);
  };

  if (!currentLocation) {
    return;
  }

  // Function to handle the camera press
  const cameraPressHandler = () => {
    console.log("Camera pressed");
  };

  // Function to handle the pee press
  const peePressHandler = () => {
    console.log("Pee pressed");
    setPees((prevPees) => [...prevPees, currentLocation]);
  };

  // Function to handle the poop press
  const poopPressHandler = () => {
    console.log("Poop pressed");
    setPoops((prevPoops) => [...prevPoops, currentLocation]);
  };

  return (
    <View style={styles.container}>
      <MapComponent mapRef={mapRef}/>
      <View style={styles.topButtonsContainer}>
        <WalkScreenTopButton icon="camera" pressHandler={cameraPressHandler}/>
        <WalkScreenTopButton icon="drop" pressHandler={peePressHandler}/>
        <WalkScreenTopButton icon="poop" pressHandler={poopPressHandler}/>
      </View>
      <View style={styles.bottomButtonContainer}>
        <WalkScreenBottomButton pressHandler={toggleTrackingHandler}/>
      </View>
    </View>
  );
}

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  topButtonsContainer: {
    position: "absolute",
    top: '2%',
    right: '5%',
  },
  bottomButtonContainer: {
    position: "absolute",
    bottom: '10%'
  },
});
