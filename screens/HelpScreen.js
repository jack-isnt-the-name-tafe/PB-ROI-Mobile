import React, { useEffect, useState } from 'react';
import {Avatar, Card, IconButton, FAB, Snackbar, TextInput, Dialog, Portal, Button, Text, Surface, Divider, Searchbar, useTheme } from "react-native-paper";
import {View, Image, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator} from "react-native";
// import { TouchableOpacity } from "react-native-gesture-handler";
import { useIsFocused } from "@react-navigation/native";
import { Dropdown } from "react-native-paper-dropdown";

export default function HelpScreen(props) {

  const isFocused = useIsFocused();
  theme = useTheme();
  
  const [offline, setOffline] = useState(false);
  const [error, setError] = useState(null);

  return (
    <Surface style={{flex:1, padding: 16}} mode="flat" elevation={1}>
      <Text
        variant="headlineLarge"
        style={{
          marginHorizontal: 10,
          marginBottom: 24,
          fontWeight: "bold",
          color: theme.colors.primary,
        }}
      >
        Help
      </Text>
      <ScrollView style={{flex: 1}}>
        {
          [
            { title: "Staff Directory", body: "The Staff Directory feature allows you to browse a list of all employees in the organisation. You can search for specific staff members and view their detailed information, including their roles, contact details, and departments." },
            { title: "Add New Staff", body: "This feature enables you to add a new staff member to the directory. To do so, tap on the '+' icon or the 'Add Staff' button, fill in the required details such as name, position, department, and contact information, and save the entry." },
            { title: "Update Staff Information", body: "You can update an existing staff member's information by navigating to their profile and selecting the 'Edit' option. Make the necessary changes and ensure to save them to keep the directory current." },
            { title: "Delete Staff Entry", body: "To remove a staff member from the directory, go to their profile, tap the 'Delete' button, and confirm the action. This will permanently remove the staff member from the directory." },
          ].map(({title, body}, index) => (
            <View 
            style={{
              borderColor: theme.colors.primary,
              borderWidth: 2,
              padding: 16,
              marginBottom: 16,
              borderRadius: 10,
            }}
            key={index}
            >
              <Text variant="titleLarge">{index + 1}. {title}</Text>
              <Text variant="bodyMedium">{body}</Text>
            </View>
          ))
        }
      </ScrollView>
    </Surface>
  )
}