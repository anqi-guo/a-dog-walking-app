import { StyleSheet, TouchableOpacity, Image, View, Dimensions } from 'react-native'
import React from 'react'

const { width, height } = Dimensions.get('window')
const icons = {
  camera: require('../assets/dslr-camera.png'),
  drop: require('../assets/drop.png'),
  poop: require('../assets/poop.png'),
}

function WalkScreenTopButton({ icon, pressHandler }) {
  return (
    <TouchableOpacity style={styles.topButtonContainer} onPress={pressHandler}>
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

const styles = StyleSheet.create({
  topButtonContainer: {
    backgroundColor: 'white',
    borderRadius: width * .08,
    width: width * .16,
    height: width * .16,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: height * .01,
  },
})