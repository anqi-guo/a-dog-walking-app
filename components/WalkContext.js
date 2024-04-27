import React, { createContext, useState, useContext } from 'react'

const WalkContext = createContext();

export function WalkProvider({ children }) {
  const [positions, setPositions] = useState([]);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [isTracking, setIsTracking] = useState(false);
  const [pees, setPees] = useState([]);
  const [poops, setPoops] = useState([]);

  return (
    <WalkContext.Provider value={{ 
      positions, setPositions, 
      currentLocation, setCurrentLocation, 
      isTracking, setIsTracking,
      pees, setPees,
      poops, setPoops,
    }}>
      {children}
    </WalkContext.Provider>
  )
}

export function useWalk() {
  return useContext(WalkContext);
}