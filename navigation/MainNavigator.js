import React from 'react'
import { View, Text, Button, StyleSheet } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation';
import { MaterialIcons } from '@expo/vector-icons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
// Import Screens
import HomeScreen from '../screens/HomeScreen';
import PeopleNavigator from './PeopleNavigator';
import HelpScreen from '../screens/HelpScreen';

//const Tab = createBottomTabNavigator();
const Tab = createMaterialBottomTabNavigator();

export default function MainNavigator() {

  const screenOptions = {
    tabBarLabelStyle:{
      fontFamily: "Trebuchet MS",
    }
  };

  return (
    <Tab.Navigator {...{ screenOptions }}>
      <Tab.Screen
        name='HomeScreen'
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name='home' color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name='PeopleNavigator'
        component={PeopleNavigator}
        options={{
          tabBarLabel: 'Staff',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name='account-group' color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name='HelpScreen'
        component={HelpScreen}
        options={{
          tabBarLabel: 'Help',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name='help-box' color={color} size={26} />
          ),
        }}
      />
      </Tab.Navigator>
  );
}
