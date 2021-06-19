/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

import HomeScreen from '~/Screens/Home';
import StudyHomeScreen from '~/Screens/StudyHome';
import StudyScreen from '~/Screens/Study';
import SettingsScreen from '~/Screens/Settings';
import MyDictScreen from '~/Screens/MyDict';
import ExamScreen from '~/Screens/Exam';

const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="StudyHome" component={StudyHomeScreen} />
      <Stack.Screen name="MyDict" component={MyDictScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="Study" component={StudyScreen} />
      <Stack.Screen name="Exam" component={ExamScreen} />
    </Stack.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <HomeStack />
    </NavigationContainer>
  );
};

export default App;
