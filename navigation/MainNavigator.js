import React from 'react'
import { View, Text, Button, StyleSheet } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
// Import Screens
import HomeScreen from '../screens/HomeScreen';
import PeopleNavigator from './PeopleNavigator';
import HelpScreen from '../screens/HelpScreen';

//const Tab = createBottomTabNavigator();
const Tab = createMaterialBottomTabNavigator();

export default function MainNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name='HomeScreen'
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name='home' color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name='PeopleNavigator'
        component={PeopleNavigator}
        options={{
          tabBarLabel: 'Staff',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name='person' color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name='HelpScreen'
        component={HelpScreen}
        options={{
          tabBarLabel: 'Help',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name='help' color={color} size={help} />
          ),
        }}
      />
      </Tab.Navigator>
  );
}

const styles = StyleSheet.create({

});