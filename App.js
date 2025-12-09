import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from './screens/WelcomeScreen';
import ConnectAppsScreen from './screens/ConnectAppsScreen';
import LocationScreen from './screens/LocationScreen';
import ProfileScreen from './screens/ProfileScreen';
import DestinationScreen from './screens/DestinationScreen';
import MagicMomentScreen from './screens/MagicMomentScreen';
import ConfirmationScreen from './screens/ConfirmationScreen';
import HomeScreen from './screens/HomeScreen';
import AddRunScreen from './screens/AddRunScreen';
import RunAddedScreen from './screens/RunAddedScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Welcome"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="ConnectApps" component={ConnectAppsScreen} />
        <Stack.Screen name="Location" component={LocationScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Destination" component={DestinationScreen} />
        <Stack.Screen name="MagicMoment" component={MagicMomentScreen} />
        <Stack.Screen name="Confirmation" component={ConfirmationScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="AddRun" component={AddRunScreen} />
        <Stack.Screen name="RunAdded" component={RunAddedScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

