import React, { useEffect, useState } from 'react';
import {Avatar, Card, IconButton, FAB, Snackbar, TextInput, Dialog, Portal, Button, Text, Surface, Divider, Searchbar, useTheme } from "react-native-paper";
import {View, Image, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator} from "react-native";
// import { TouchableOpacity } from "react-native-gesture-handler";
import { useIsFocused } from "@react-navigation/native";
import { Dropdown } from "react-native-paper-dropdown";

export default function NotFoundScreen(props) {
  return (
    <Surface style={{flex:1, padding: 16}}>
      <Text variant='displaySmall' style={{ fontFamily: "Trebuchet MS, Calibri, Arial, sans-serif", }}>Not Found Screen</Text>
    </Surface>
  )
}