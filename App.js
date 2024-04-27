import 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { TabScreen } from './components/Navigator';
import { WalkProvider } from './components/WalkContext';

export default function App() {
  return (
    <NavigationContainer>
      <WalkProvider>
        <TabScreen />
      </WalkProvider>
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
