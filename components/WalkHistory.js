import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { onSnapshot, collection } from 'firebase/firestore';
import { db } from '../firebase-files/firebaseSetup';
import { useNavigation } from '@react-navigation/native';

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
            <Text>{item.date}</Text>
            <Text>Duration: {item.duration} minutes</Text>
            <Text>Distance: {item.distance} km</Text>
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
  },
})