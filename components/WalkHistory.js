import { StyleSheet, Text, View, FlatList } from 'react-native'
import React, { useState, useEffect } from 'react'
import { onSnapshot, collection } from 'firebase/firestore';
import { db } from '../firebase-files/firebaseSetup';

export default function WalkHistory() {
  const [ walks, setWalks ] = useState([]);

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
          <View style={styles.itemContainer}>
            <Text>{item.date}</Text>
            <Text>Duration: {item.duration} minutes</Text>
            <Text>Distance: {item.distance} km</Text>
          </View>
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