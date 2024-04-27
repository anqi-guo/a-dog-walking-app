import { StyleSheet, Text, View, Dimensions } from "react-native";
import React, { useState, useEffect } from "react";
import * as turf from "@turf/turf";
import MapView, { Marker, Polyline } from "react-native-maps";
import { useNavigation, useRoute } from "@react-navigation/native";
import { addWalk } from "../firebase-files/firebaseHelper";

// Monitor component to display the duration and distance of a walk
export default function Monitor() {
  const [duration, setDuration] = useState(0);
  const [distance, setDistance] = useState(0);
  const [region, setRegion] = useState(null);

  const route = useRoute();
  const positions = route.params.positions;
  const isNew = route.params.isNew;

  useEffect(() => {
    const duration = calculateDuration(positions);
    const distance = calculateTotalDistance(positions);
    setDuration(duration);
    setDistance(distance);
    zoom();
    if (isNew) {
      addWalkToFirebase(duration, distance);
    }
  }, [positions]);

  const addWalkToFirebase = async (duration, distance) => {
    const walk = {
      date: new Date(positions[0].timestamp).toLocaleDateString(),
      duration: duration,
      distance: distance,
      like: false,
      positions: positions,
    };
    await addWalk(walk);
  }

  // Function to calculate the duration of the walk
  const calculateDuration = (positions) => {
    try {
      if (positions.length < 2) {
        return 0;
      }
      const startTime = positions[0].timestamp;
      const endTime = positions[positions.length - 1].timestamp;
      const duration = (endTime - startTime) / 1000 / 60;
      return duration.toFixed(2);
    } catch (error) {
      return 0;
    }
  };

  // Function to calculate the total distance of the walk
  const calculateTotalDistance = (positions) => {
    try {
      if (positions.length < 2) {
        return 0;
      }
      let totalDistance = 0;
      for (let i = 0; i < positions.length - 1; i++) {
        const from = [positions[i].coords.longitude, positions[i].coords.latitude];
        const to = [positions[i + 1].coords.longitude, positions[i + 1].coords.latitude];
        const distance = turf.distance(from, to, { units: "kilometers" });

        totalDistance += distance;
      }
      return totalDistance.toFixed(2);
    } catch (error) {
      return 0;
    }
  };

  const zoom = () => {
    // Calculate bounding box
    const minLat = Math.min(...positions.map((position) => position.coords.latitude));
    const maxLat = Math.max(...positions.map((position) => position.coords.latitude));
    const minLng = Math.min(...positions.map((position) => position.coords.longitude));
    const maxLng = Math.max(...positions.map((position) => position.coords.longitude));

    // Calculate center
    const centerLat = (minLat + maxLat) / 2;
    const centerLng = (minLng + maxLng) / 2;

    // Calculate deltas
    const deltaLat = maxLat - minLat;
    const deltaLng = maxLng - minLng;

    // Set map region
    const region = {
      latitude: centerLat,
      longitude: centerLng,
      latitudeDelta: deltaLat * 1.5,
      longitudeDelta: deltaLng * 1.5,
    };
    setRegion(region);
  }
  
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.text}>Duration: {duration} mins</Text>
        <Text style={styles.text}>Distance: {distance} km</Text>
      </View>
      <MapView
        style={styles.mapContainer}
        region={region}
      >
        <Polyline
          coordinates={positions.map((position) => ({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          }))}
          strokeWidth={5}
          strokeColor="blue"
        />
        <Marker
          coordinate={{
            latitude: positions[0].coords.latitude,
            longitude: positions[0].coords.longitude,
          }}
          title="Start"
          description={new Date(positions[0].timestamp).toLocaleTimeString()}
        />
        <Marker
          coordinate={{
            latitude: positions[positions.length - 1].coords.latitude,
            longitude: positions[positions.length - 1].coords.longitude,
          }}
          title="End"
          description={new Date(positions[positions.length - 1].timestamp).toLocaleTimeString()}
          pinColor="blue"
        />
      </MapView>
    </View>
  );
}

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  textContainer: {
    height: '10%',
    justifyContent: "center",
    color: "white",
  },
  text: {
    fontSize: width * 0.04,
    fontWeight: "bold",
    textAlign: "center",
  },
  mapContainer: {
    width: '100%',
    height: '90%',
  },
});
