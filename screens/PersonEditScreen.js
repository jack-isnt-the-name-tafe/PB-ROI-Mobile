import React, { useEffect, useState } from 'react';
import {Avatar, Card, IconButton, FAB, Snackbar, TextInput, Dialog, Portal, Button, Text, Surface, Divider, Searchbar, useTheme } from "react-native-paper";
import {View, Image, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator} from "react-native";
// import { TouchableOpacity } from "react-native-gesture-handler";
import { useIsFocused } from "@react-navigation/native";
import { Dropdown } from "react-native-paper-dropdown";
import { fetchPersonById } from '../utils/api';
import { addPerson } from '../utils/api';
import { updatePerson } from '../utils/api';

export default function PersonEditScreen(props) {

  const isFocused = useIsFocused();
  const { id } = props.route.params;

  const [person, setPerson] = useState({
      "id": 0,
      "name": "",
      "phone": "",
      "street": "",
      "city": "",
      "state": "",
      "zip": "",
      "country": "",
      "departmentId": 0,
  });
  const [offline, setOffline] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      if (id !== -1) {
        const data = await fetchPersonById(id);
        setPerson(data);
        console.log(data);
      } else {
        console.log("New Person");
      }
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

  async function handleSubmitTest() {
    try {
      if (id === -1) {
        await addPerson({
          "name": "New Person",
          "phone": "0400 000 000",
          "street": "123 Fake St",
          "city": "New Vegas",
          "state": "Yo mama",
          "zip": "1234",
          "country": "Yo dad",
          "departmentId": 1,
        });
      } else {
        await updatePerson(id, {
          "name": person.name + " updated",
          "phone": person.phone,
          "street": person.street,
          "city": person.city,
          "state": person.state,
          "zip": person.zip,
          "country": person.country,
          "departmentId": person.departmentId,
          "Department": person.Department
        });
      }
      props.navigation.goBack();
    } catch (err) {
      console.error(err);
      setError("Failed to save data.");
    }
  }

  return (
    <Surface style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
      <Text variant='displaySmall'>Person Edit Screen</Text>
      <Text>Employee ID: {id}</Text>
      <Text>Name: {person?.name}</Text>
      <Text>Phone Number: {person?.phone}</Text>
      <Text>Address: {person?.street} {person?.city}, {person?.state} {person?.zip} {person?.country}</Text>
      <Text>Department: {person?.Department?.name}</Text>

      <Button mode="contained" icon="arrow-left" onPress={() => showPeopleViewScreen()}>
        Go Back
      </Button>

      <Button mode="contained" icon="update" onPress={() => handleSubmitTest()}>
        Save Person Details
      </Button>
    </Surface>
  )
}