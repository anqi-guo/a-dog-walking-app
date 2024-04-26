import { StyleSheet, Text, View, Dimensions } from "react-native";
import React, { useState, useEffect } from "react";
import * as turf from "@turf/turf";

// Monitor component to display the duration and distance of a walk
export default function Monitor({ positions }) {
  const [duration, setDuration] = useState(0);
  const [distance, setDistance] = useState(0);

  useEffect(() => {
    setDuration(calculateDuration(positions));
    setDistance(calculateTotalDistance(positions));
  }, [positions]);

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
  
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Duration: {duration} mins</Text>
      <Text style={styles.text}>Distance: {distance} km</Text>
    </View>
  );
}

const { height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
    height: height * 0.1,
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
