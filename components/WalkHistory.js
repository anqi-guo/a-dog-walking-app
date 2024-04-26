import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { onSnapshot, collection } from 'firebase/firestore';
import { db } from '../firebase-files/firebaseSetup';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import { deleteWalk, updateWalk } from '../firebase-files/firebaseHelper';

export default function WalkHistory() {
  const [ walks, setWalks ] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'walks'), (snapshot) => {
      const walks = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setWalks(walks);
    });
    return unsubscribe;
  }, []);

  return (
    <View>
      <FlatList
        data={walks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.itemContainer}
            onPress={() => navigation.navigate('Monitor', { positions: item.positions, isNew: false})}
          >
            <View style={styles.textContainer}>
              <Text>{item.date}</Text>
              <Text>Duration: {item.duration} minutes</Text>
              <Text>Distance: {item.distance} km</Text>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity>
                <FontAwesome name="heart-o" size={24} color="black" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => deleteWalk(item.id)}>
                <FontAwesome5 name="trash-alt" size={24} color="black" />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  itemContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
    flexDirection: 'row',
  },
  textContainer: {
    flex: .7,
  },
  buttonContainer: {
    flexDirection: 'row',
    flex: .3,
    justifyContent: 'space-around',
    alignItems: 'center',
  }
})