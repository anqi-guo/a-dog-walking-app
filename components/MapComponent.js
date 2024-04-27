import React from 'react';
import MapView, { Polyline } from 'react-native-maps';
import { StyleSheet } from 'react-native';
import { useWalk } from './WalkContext';

export default function MapComponent({ mapRef}) {
  const { positions, currentLocation } = useWalk();
  
  return (
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
  );
}

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});