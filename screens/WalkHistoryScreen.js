import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { onSnapshot, collection } from 'firebase/firestore';
import { db } from '../firebase-files/firebaseSetup';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome, Feather } from '@expo/vector-icons';
import { deleteWalk, updateWalk } from '../firebase-files/firebaseHelper';

export default function WalkHistory() {
  const [ walks, setWalks ] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'walks'), (snapshot) => {
      const walks = snapshot.docs.map((doc) => ({ 
        id: doc.id, 
        ...doc.data(), 
        date: new Date(doc.data().timestamp).toLocaleDateString() }));
      walks.sort((a, b) => b.date - a.date);
      setWalks(walks);
    });
    return unsubscribe;
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.listContainer}
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
              <TouchableOpacity onPress={async() => await updateWalk(item.id, {like: !item.like})}>
                {item.like 
                ? <FontAwesome name="heart" size={24} color="red" /> 
                : <FontAwesome name="heart-o" size={24} color="black" /> }
              </TouchableOpacity>
              <TouchableOpacity onPress={async() => await deleteWalk(item.id)}>
                <Feather name="trash-2" size={24} color="black" />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  listContainer: {
    flex: 1,
    width: '100%',
  },

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
  },
  plusButtonContainer: {    
    padding: 10,
    backgroundColor: '#2E86C1',
    borderRadius: 50,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
})