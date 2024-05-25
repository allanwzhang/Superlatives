import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from "../screens/HomeScreen";
import LobbyScreen from '../screens/LobbyScreen';
import JoinCodeScreen from '../screens/JoinCodeScreen';
import StartScreen from '../screens/StartScreen';
import QuestionScreen from '../screens/QuestionScreen';
import ResultsScreen from '../screens/ResultsScreen';

const Stack = createStackNavigator();

function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options = {{ headerShown: false}} />
        <Stack.Screen name="Lobby" component={LobbyScreen} options={{ headerShown: false }} />
        <Stack.Screen name="JoinCode" component={JoinCodeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Start" component={StartScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Question" component={QuestionScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Results" component={ResultsScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;