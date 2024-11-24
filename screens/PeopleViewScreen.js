import React, { useEffect, useState } from 'react';
import {Avatar, Card, IconButton, FAB, Snackbar, TextInput, Dialog, Portal, Button, Text, Surface, Divider, Searchbar, useTheme } from "react-native-paper";
import {View, Image, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator} from "react-native";
// import { TouchableOpacity } from "react-native-gesture-handler";
import { useIsFocused } from "@react-navigation/native";
import { Dropdown } from "react-native-paper-dropdown";
import { fetchPeople } from '../utils/api';

export default function PeopleViewScreen(props) {

  const isFocused = useIsFocused();

  const [people, setPeople] = useState([]);
  const [offline, setOffline] = useState(false);
  const [error, setError] = useState(null);
  const [visible, setVisible] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [selectedPersonName, setSelectedPersonName] = useState("");

  const fetchData = async () => {
    try {
      const data = await fetchPeople();
      setPeople(data);
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
      function showPersonViewScreen(id) {
        props.navigation.navigate("PersonViewScreen", { id: id });
      }
      function showPersonEditScreen(id) {
        props.navigation.navigate("PersonEditScreen", { id: id });
      }
    // #endregion

  return (
    <Surface style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
      <Text variant='displaySmall'>People View Screen</Text>

      {people.map((person) => (
        <Text key={person.id}>{person.name}</Text>
      ))}

      <Button mode="contained" icon="magnify" onPress={() => showPersonViewScreen(3)}>
        View Person ID 3
      </Button>

      <Button mode="contained" icon="pencil" onPress={() => showPersonEditScreen(3)}>
        Edit Person ID 3
      </Button>

      <Button mode="contained" icon="update" onPress={() => showPersonEditScreen(-1)}>
        Add Person
      </Button>
    </Surface>
  )
}