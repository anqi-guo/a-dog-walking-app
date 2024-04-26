import 'react-native-gesture-handler';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { NavigationContainer, DrawerActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Entypo, MaterialIcons } from '@expo/vector-icons';
import Home from './components/Home';
import Monitor from './components/Monitor';
import WalkHistory from './components/WalkHistory';
import Profile from './components/Profile';

const Drawer = createDrawerNavigator();
const HomeStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator screenOptions={{headerShown:false}}>
      <HomeStack.Screen name="Home" component={Home} />
      <HomeStack.Screen name="Monitor" component={Monitor} />
    </HomeStack.Navigator>
  );
}

function DrawerScreen() {
  return (
    <Drawer.Navigator screenOptions={{
      headerShown:false,
    }}>
      <Drawer.Screen name="HomeStack" component={HomeStackScreen} options={{title: "Walk"}}/>
      <Drawer.Screen name="Profile" component={Profile} options={{title: "Profile"}}/>
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={({navigation}) => ({
        headerLeft: () => (
          <TouchableOpacity
            onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
            style={{marginLeft: 10}}
          >
            <View style={{padding: 10}}>
              <MaterialIcons name="menu" size={24} color="black" />
            </View>
          </TouchableOpacity>
        )
      })}
      >
        <Tab.Screen name="Walk" component={DrawerScreen} options={{tabBarIcon: () => <Entypo name="home" size={24} color="black" />}}/>
        <Tab.Screen name="Walk History" component={WalkHistory} options={{tabBarIcon: () => <Entypo name="list" size={24} color="black" />}}/>
      </Tab.Navigator>
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
