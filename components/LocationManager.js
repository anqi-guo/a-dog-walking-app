import * as Location from "expo-location";

export const getLocation = async (setCurrentLocation, setPositions, isTracking) => {
  try {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.log("Permission not granted");
      return;
    }
    const location = await Location.getCurrentPositionAsync({});
    if (location) {
      setCurrentLocation(location);
      if (isTracking) {
        setPositions((prevPositions) => {
          if (
            prevPositions.length === 0 ||
            location.coords.latitude !== prevPositions[prevPositions.length - 1].latitude ||
            location.coords.longitude !== prevPositions[prevPositions.length - 1].longitude
          ) {
            return [...prevPositions, location];
          } else {
            return prevPositions;
          }
        });
      }
    }
  } catch (error) {
    console.log("Error getting location", error);
  }
};
