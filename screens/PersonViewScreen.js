import React, { useEffect, useState } from 'react';
import {Avatar, Card, IconButton, FAB, Snackbar, TextInput, Dialog, Portal, Button, Text, Surface, Divider, Searchbar, useTheme } from "react-native-paper";
import {View, Image, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator} from "react-native";
// import { TouchableOpacity } from "react-native-gesture-handler";
import { useIsFocused } from "@react-navigation/native";
import { Dropdown } from "react-native-paper-dropdown";
import { fetchPersonById } from '../utils/api';

export default function PersonViewScreen(props) {

  const isFocused = useIsFocused();
  const { id } = props.route.params;

  const [person, setPerson] = useState({});
  const [offline, setOffline] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const data = await fetchPersonById(id);
      setPerson(data);
    } catch (err) {
      console.error(err);
      setOffline(true);
      setError("Unable to fetch data, offline mode");
    }
  };

  useEffect(() => {
    if (isFocused) {
      fetchData();
    }
  }, [isFocused]);

  // #region Navigation
    function showPeopleViewScreen() {
      props.navigation.navigate("PeopleViewScreen");
    }
  // #endregion


  return (
    <Surface style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
      <Text variant='displaySmall'>Person View Screen</Text>
      <Text>Employee ID: {id}</Text>
      <Text>Name: {person?.name}</Text>
      <Text>Phone Number: {person?.phone}</Text>
      <Text>Address: {person?.street} {person?.city}, {person?.state} {person?.zip} {person?.country}</Text>
      <Text>Department: {person?.Department?.name}</Text>

      <Button mode="contained" icon="arrow-left" onPress={() => showPeopleViewScreen()}>
        Go Back
      </Button>
    </Surface>
  )
}