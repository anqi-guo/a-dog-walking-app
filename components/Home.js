import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from "react-native";
import React, { useState, useEffect, useRef } from "react";
import MapView, { Polyline } from "react-native-maps";
import * as Location from "expo-location";
import Monitor from "./Monitor";

//Walk screen allows the user to record walk route on a map, walk duration and time. 
//The user can also take photos while walk the dog, the photo will be pined on the route map. 
export default function Home() {
  const [positions, setPositions] = useState([]);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [isTracking, setIsTracking] = useState(false);
  const [showMonitor, setShowMonitor] = useState(false);

  const mapRef = useRef(null);

  // Get the current location and start tracking
  useEffect(() => {
    getLocation();
  }, []);

  useEffect(() => {
    if (isTracking) {
      const interval = setInterval(getLocation, 1000);
      return () => clearInterval(interval);
    }
  }, [isTracking]);

  // Function to get the current location
  const getLocation = () => {
    Location.requestForegroundPermissionsAsync()
      .then(({ status }) => {
        if (status !== "granted") {
          console.log("Permission not granted");
          return;
        }
        return Location.getCurrentPositionAsync({});
      })
      .then((location) => {
        if (location) {
          setCurrentLocation(location);
          if (isTracking) {
            setPositions((prevPositions) => {
              if (
                prevPositions.length === 0 ||
                location.coords.latitude !==
                  prevPositions[prevPositions.length - 1].latitude ||
                location.coords.longitude !==
                  prevPositions[prevPositions.length - 1].longitude
              ) {
                return [...prevPositions, location];
              } else {
                return prevPositions;
              }
            });
          }
        }
      })
      .catch((error) => {
        console.log("Error getting location", error);
      });
  };

  // Function to toggle tracking
  const handleToggleTracking = () => {
    if (isTracking) { // If the user stops the walk
      if (positions.length < 2) {
        alert("You need to walk more to record a walk!");
      } 
      setShowMonitor(true)
    } else {
      setPositions([]);
      setShowMonitor(false);
    }
    setIsTracking((prevIsTracking) => !prevIsTracking);
  };

  if (!currentLocation) {
    return;
  }

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={{
          latitude: currentLocation.latitude,
          longitude: currentLocation.longitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
        showsUserLocation={true}
        followsUserLocation={true}
        showsMyLocationButton={true}
        //provider="google"
      >
        <Polyline
          coordinates={positions.map((position) => ({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          }))}
          lineCap='round'
          strokeWidth={3}
          strokeColor='#2E86C1'
          lineDashPattern={[1, 0]}
        />
      </MapView>
      {showMonitor && (
        <View style={styles.monitorContainer}>
          <Monitor positions={positions} />
        </View>
      )}
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
