import { StyleSheet, TouchableOpacity, Image, Text, Dimensions } from 'react-native'
import React from 'react'
import { useWalk } from './WalkContext'

const { width, height } = Dimensions.get('window')
const icons = {
  camera: require('../assets/dslr-camera.png'),
  drop: require('../assets/drop.png'),
  poop: require('../assets/poop.png'),
}

function WalkScreenTopButton({ icon, pressHandler }) {
  return (
    <TouchableOpacity style={styles.walkScreenTopButton} onPress={pressHandler}>
      <Image source={icons[icon]} style={{width: width*.09, height: width*.09}} />
    </TouchableOpacity>
  )
}

function pressHandler(icon) {
  console.log(`Pressed ${icon}`)
}

export function WalkScreenTopButtons() {
  return (
    <>
      <WalkScreenTopButton icon="camera" pressHandler={() => pressHandler('camera')} />
      <WalkScreenTopButton icon="drop" pressHandler={() => pressHandler('drop')} />
      <WalkScreenTopButton icon="poop" pressHandler={() => pressHandler('poop')} />
    </>
  )
}

export function WalkScreenBottomButton({pressHandler}) {
  const { isTracking } = useWalk();
  return (
    <TouchableOpacity style={styles.walkScreenBottomButton} onPress={pressHandler}>
      <Text style={styles.walkScreenBottomButtonText}>{isTracking ? "End" : "Go"}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  walkScreenTopButton: {
    backgroundColor: 'white',
    borderRadius: width * .08,
    width: width * .16,
    height: width * .16,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: height * .01,
  },
  walkScreenBottomButton: {
    backgroundColor: '#2E86C1',
    borderRadius: width * .1,
    width: width * .2,
    height: width * .2,
    justifyContent: "center",
    alignItems: "center",
  },
  walkScreenBottomButtonText: {
    color: "white",
    fontSize: width * .08,
    fontWeight: "bold",
  },
})