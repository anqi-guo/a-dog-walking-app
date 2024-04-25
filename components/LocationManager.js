import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native'
import React from 'react'

export default function LocationManager() {
  return (
    <View>
      <TouchableOpacity 
        style={styles.button}
        onPress={() => console.log('Go')}
        >
        <Text style={styles.text}>Go</Text>
      </TouchableOpacity>
    </View>
  )
}

const { width, height } = Dimensions.get('window')

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'green',
    width: width * .25,
    height: width * .25,
    borderRadius: width * .125,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: height * .05,
  },
  text: {
    color: 'white',
    fontSize: width * .06,
  },
})