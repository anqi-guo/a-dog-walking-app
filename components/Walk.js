import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from "react-native";
import React, { useState, useEffect, useRef } from "react";
import MapView, { Polyline } from "react-native-maps";
import * as Location from "expo-location";
import { useNavigation, useRoute } from "@react-navigation/native";
import { getLocation } from "./LocationManager";
import MapComponent from "./MapComponent";

//Walk screen allows the user to record walk route on a map, walk duration and time. 
//The user can also take photos while walk the dog, the photo will be pined on the route map. 
export default function Walk() {
  const [positions, setPositions] = useState([]);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [isTracking, setIsTracking] = useState(false);

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
  const handleToggleTracking = async() => {
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

  return (
    <View style={styles.container}>
      <MapComponent mapRef={mapRef} positions={positions} currentLocation={currentLocation} />
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity style={styles.button} onPress={handleToggleTracking}>
          <Text style={styles.buttonText}>{isTracking ? "End" : "Go"}</Text>
        </TouchableOpacity>
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
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  button: {
    backgroundColor: '#2E86C1',
    borderRadius: width * .1,
    width: width * .2,
    height: width * .2,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: height * .1,
  },
  buttonText: {
    color: "white",
    fontSize: width * .08,
    fontWeight: "bold",
  },
  monitorContainer: {
    position: "absolute",
    width: '95%',
    height: '95%',
    bottom: '2.5%',
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    zIndex: 100,
  },
});
