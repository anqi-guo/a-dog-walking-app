import 'react-native-gesture-handler';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { NavigationContainer, DrawerActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Entypo, MaterialIcons, Ionicons } from '@expo/vector-icons';
import Walk from './Walk';
import Monitor from './Monitor';
import WalkHistory from './WalkHistory';
import Profile from './Profile';

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

const CustomTabBarButton = ({ children, onPress }) => (
  <TouchableOpacity
    style={{
      top: -30,
      justifyContent: 'center',
      alignItems: 'center',
      width: 70,
      height: 70,
      borderRadius: 35,
      backgroundColor: '#2E86C1',
    }}
    onPress={onPress}
  >
    {children}
  </TouchableOpacity>
);

export function TabScreen() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Walks" component={WalkHistory} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <Entypo name="list" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen name="Walk" component={Walk} 
        options={({ navigation }) => ({
          tabBarIcon: () => (
            <Entypo name="plus" size={24} color="white" />
          ),
          tabBarLabel: () => null,
          tabBarStyle: { display: 'none' },
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.navigate("Walks")}>
              <View style={{ marginLeft: 10 }}>
                <Ionicons name="arrow-back" size={24} color="black" />
              </View>
            </TouchableOpacity>
          ),
          tabBarButton: (props) => (
            <CustomTabBarButton {...props} />
          ),
        })}
      />
      <Tab.Screen name="Profile" component={Profile} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="account-circle" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
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
