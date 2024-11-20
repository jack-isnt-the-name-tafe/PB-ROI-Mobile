import React from 'react'
import { StyleSheet } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
// Import Screens
import PeopleViewScreen from '../screens/PeopleViewScreen';
import PersonViewScreen from '../screens/PersonViewScreen';
import PersonEditScreen from '../screens/PersonEditScreen';

const Stack = createStackNavigator();

export default function PeopleNavigator() {
  return (
    <Stack.Navigator initialRouteName='StackScreen1' screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name='PeopleViewScreen'
        component={PeopleViewScreen}
      />
      <Stack.Screen
        name='PersonViewScreen'
        component={PersonViewScreen}
      />
      <Stack.Screen
        name='PersonEditScreen'
        component={PersonEditScreen}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({

});