import 'react-native-gesture-handler';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { NavigationContainer, DrawerActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Entypo, MaterialIcons } from '@expo/vector-icons';
import Walk from './components/Walk';
import Monitor from './components/Monitor';
import WalkHistory from './components/WalkHistory';
import Profile from './components/Profile';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function StackScreen() {
  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
      <Stack.Screen name="Home" component={TabScreen} />
      <Stack.Screen name="Walk" component={Walk} />
      <Stack.Screen name="Monitor" component={Monitor} />
    </Stack.Navigator>
  );
}

function TabScreen() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Walks" component={WalkHistory} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}


export default function App() {
  return (
    <NavigationContainer>
      <TabScreen />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
