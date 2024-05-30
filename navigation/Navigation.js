import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from "../screens/HomeScreen";
import LobbyScreen from '../screens/LobbyScreen';
import JoinCodeScreen from '../screens/JoinCodeScreen';
import StartScreen from '../screens/StartScreen';
import QuestionScreen from '../screens/QuestionScreen';
import ResultsScreen from '../screens/ResultsScreen';
import ScoreboardScreen from '../screens/ScoreboardScreen';
import WinnerScreen from '../screens/WinnerScreen';
import VideoScreen from '../screens/VideoScreen';

const Stack = createStackNavigator();

function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options = {{ headerShown: false, gestureEnabled: false}} />
        <Stack.Screen name="Lobby" component={LobbyScreen} options={{ headerShown: false, gestureEnabled: false }} />
        <Stack.Screen name="JoinCode" component={JoinCodeScreen} options={{ headerShown: false, gestureEnabled: false }} />
        <Stack.Screen name="Start" component={StartScreen} options={{ headerShown: false, gestureEnabled: false }} />
        <Stack.Screen name="Question" component={QuestionScreen} options={{ headerShown: false, gestureEnabled: false }} />
        <Stack.Screen name="Results" component={ResultsScreen} options={{ headerShown: false, gestureEnabled: false }} />
        <Stack.Screen name="Scoreboard" component={ScoreboardScreen} options={{ headerShown: false, gestureEnabled: false }} />
        <Stack.Screen name="Winner" component={WinnerScreen} options={{ headerShown: false, gestureEnabled: false }} />
        <Stack.Screen name="Video" component={VideoScreen} options={{ headerShown: false, gestureEnabled: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;