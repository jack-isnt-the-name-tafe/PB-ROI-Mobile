import React, { useEffect, useState } from 'react';
import {Avatar, Card, IconButton, FAB, Snackbar, TextInput, Dialog, Portal, Button, Text, Surface, Divider, Searchbar, useTheme, Icon } from "react-native-paper";
import {View, Image, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator} from "react-native";
// import { TouchableOpacity } from "react-native-gesture-handler";
import { useIsFocused } from "@react-navigation/native";
import { Dropdown } from "react-native-paper-dropdown";

export default function HomeScreen(props) {

  const isFocused = useIsFocused();
  theme = useTheme();
  
  const [offline, setOffline] = useState(false);
  const [error, setError] = useState(null);
  const [logoMono, setLogoMono] = useState(false);

  const logoImage = {
    logo: require("../assets/roi-logo.jpg"),
    mono: require("../assets/roi-logo-monochrome.jpg"),
  }

  return (
    <Surface style={{flex:1, padding: 16}}>
      <View>
        <IconButton icon="account-circle" mode="contained" iconColor={theme.colors.onSecondary} size={24} style={{marginLeft: 20}}/>
        <Text
          variant="headlineLarge"
          style={{
            marginHorizontal: 10,
            marginBottom: 0,
            fontWeight: "bold",
            color: theme.colors.primary,
            marginLeft: 20,
            fontFamily: "Trebuchet MS, Calibri, Arial, sans-serif",
          }}
        >
          Hi, Patrick
        </Text>
      </View>
      <View>
        <Divider style={{margin: 20, borderColor: theme.colors.primary}}/>
        <TouchableOpacity onPressOut={() => {setLogoMono(!logoMono)}}>
          <Image 
            source={logoMono ? logoImage.mono : logoImage.logo} 
            style={{width: 305, height: 159, marginLeft: "auto", marginRight: "auto"}} 
          />
        </TouchableOpacity>
        <Divider style={{margin: 20, borderColor: theme.colors.primary}}/>
      </View>
      <View>
        <Text variant="titleLarge" style={{fontWeight: "bold", marginLeft: "auto", marginRight: "auto", fontFamily: "Trebuchet MS, Calibri, Arial, sans-serif",}}>ROI HR System</Text>
        <Divider style={{margin: 20, borderColor: theme.colors.primary}}/>
        <Text variant="titleMedium" style={{fontWeight: "bold", marginLeft: "auto", marginRight: "auto", fontFamily: "Trebuchet MS, Calibri, Arial, sans-serif",}}>Remaining Leave Days: 10</Text>
        <Divider style={{margin: 20, borderColor: theme.colors.primary}}/>
        <Text variant="titleMedium" style={{fontWeight: "bold", marginBottom: 20, marginLeft: "auto", marginRight: "auto", fontFamily: "Trebuchet MS, Calibri, Arial, sans-serif",}}>Application developed by Patrick Brown</Text>
        <Text variant="titleMedium" style={{fontWeight: "bold", marginLeft: "auto", marginRight: "auto", fontFamily: "Trebuchet MS, Calibri, Arial, sans-serif",}}>&copy; 2024 Red Opal Interactive</Text>
      </View>
    </Surface>
  )
}