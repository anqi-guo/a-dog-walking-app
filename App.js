import 'react-native-gesture-handler';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Entypo } from '@expo/vector-icons';
import Home from './components/Home';
import Monitor from './components/Monitor';
import WalkHistory from './components/WalkHistory';

const Drawer = createDrawerNavigator();
const HomeStack = createNativeStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator screenOptions={{headerShown:false}}>
      <HomeStack.Screen name="Home" component={Home} />
      <HomeStack.Screen name="Monitor" component={Monitor} />
    </HomeStack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator screenOptions={({ navigation }) => ({
        headerRight: () => (
          <TouchableOpacity onPress={
            () => navigation.navigate('HomeStack', { screen: 'Home' })
          }>
            <Entypo name="home" size={22} color="black" style={{marginRight: 10}}/>
          </TouchableOpacity>
        ),
      })}>
        <Drawer.Screen name="HomeStack" component={HomeStackScreen} options={{title: "Walk"}}/>
        <Drawer.Screen name="WalkHistory" component={WalkHistory} options={{title: "Walk History"}}/>
      </Drawer.Navigator>
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
