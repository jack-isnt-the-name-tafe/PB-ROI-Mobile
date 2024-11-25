import React, { useEffect, useState } from 'react';
import {Avatar, Card, IconButton, FAB, Snackbar, TextInput, Dialog, Portal, Button, Text, Surface, Divider, Searchbar, useTheme } from "react-native-paper";
import {View, Image, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator} from "react-native";
// import { TouchableOpacity } from "react-native-gesture-handler";
import { useIsFocused } from "@react-navigation/native";
import { Dropdown } from "react-native-paper-dropdown";
import { fetchDepartments, fetchPersonById } from '../utils/api';
import { addPerson } from '../utils/api';
import { updatePerson } from '../utils/api';

export default function PersonEditScreen(props) {

  const isFocused = useIsFocused();
  theme = useTheme();
  const { id } = props.route.params;

  const [person, setPerson] = useState({
      "name": "",
      "phone": "",
      "street": "",
      "city": "",
      "state": "",
      "zip": "",
      "country": "",
      "departmentId": null,
  });
  const [departments, setDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [offline, setOffline] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const fetchedDepartments = await fetchDepartments();
      setDepartments(fetchedDepartments);
      setSelectedDepartment(fetchedDepartments[0].id);

      if (id !== -1) {
        const data = await fetchPersonById(id);
        setPerson(data);
        setSelectedDepartment(data.departmentId);
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

  {/*If the person's data isn't loaded yet*/}
  if (!person) {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Text variant="titleMedium">Loading Staff Details...</Text>
      </View>
    );
  }

  // #region Navigation
    function showPeopleViewScreen() {
      props.navigation.navigate("PeopleViewScreen");
    }
  // #endregion

  async function handleSubmit() {
    try {
      const updatedPerson = { ...person, departmentId: selectedDepartment };
      console.log("Updated person output: ", updatedPerson);
      if (id === -1) {
        await addPerson(updatedPerson);
      } else {
        await updatePerson(id, updatedPerson);
      }
      props.navigation.goBack();
    } catch (err) {
      console.error(err);
      setError("Failed to save data.");
    }
  };

  return (
    <Surface style={{flex:1, padding: 16}}>
      <Text
        variant="headlineLarge"
        style={{
          marginHorizontal: 10,
          marginBottom: 24,
          fontWeight: "bold",
          color: theme.colors.primary,
        }}
      >
        {id===-1 ? "Add New Staff" : `Edit ${person.name}`}
      </Text>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 34 }}>
        <TextInput
          label="Name"
          value={person.name}
          onChangeText={(text) => setPerson({ ...person, name: text })}
          mode="outlined"
          keyboardType="numeric"
          style={{ marginBottom: 16 }}
        />
        <TextInput
          label="Phone"
          value={person.phone}
          onChangeText={(text) => setPerson({ ...person, phone: text })}
          mode="outlined"
          keyboardType="numeric"
          style={{ marginBottom: 16 }}
        />
        <TextInput
          label="Street"
          value={person.street}
          onChangeText={(text) => setPerson({ ...person, street: text })}
          mode="outlined"
          keyboardType="numeric"
          style={{ marginBottom: 16 }}
        />
        <TextInput
          label="City"
          value={person.city}
          onChangeText={(text) => setPerson({ ...person, city: text })}
          mode="outlined"
          keyboardType="numeric"
          style={{ marginBottom: 16 }}
        />
        <TextInput
          label="Zip"
          value={person.zip}
          onChangeText={(text) => setPerson({ ...person, zip: text })}
          mode="outlined"
          keyboardType="numeric"
          style={{ marginBottom: 16 }}
        />
        <TextInput
          label="Country"
          value={person.country}
          onChangeText={(text) => setPerson({ ...person, country: text })}
          mode="outlined"
          keyboardType="numeric"
          style={{ marginBottom: 16 }}
        />
        <TextInput
          label="State"
          value={person.state}
          onChangeText={(text) => setPerson({ ...person, state: text })}
          mode="outlined"
          keyboardType="numeric"
          style={{ marginBottom: 16 }}
        />
        <Dropdown
          label="Department"
          mode="outlined"
          value={selectedDepartment}
          onSelect={setSelectedDepartment}
          options={departments.map((department) => ({
            label: department.name,
            value: department.id,
          }))}
        />
      </ScrollView>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            padding: 10,
          }}
        >
          <View style={{ flex: 1, marginHorizontal: 10 }}>
            <Button
              mode="outlined"
              icon="keyboard-return"
              onPress={showPeopleViewScreen}
            >
              Cancel
            </Button>
          </View>
          <View style={{ flex: 1, marginHorizontal: 10 }}>
            <Button mode="contained" icon="update" onPress={handleSubmit}>
              Update
            </Button>
          </View>
        </View>
    </Surface>
  )
}