import React, { useEffect, useState } from 'react';
import {Avatar, Card, IconButton, FAB, Snackbar, TextInput, Dialog, Portal, Button, Text, Surface, Divider, Searchbar, useTheme } from "react-native-paper";
import {View, Image, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator} from "react-native";
// import { TouchableOpacity } from "react-native-gesture-handler";
import { useIsFocused } from "@react-navigation/native";
import { Dropdown } from "react-native-paper-dropdown";
import { fetchPeople } from '../utils/api';
import { deletePerson } from '../utils/api';

export default function PeopleViewScreen(props) {

  const isFocused = useIsFocused();
  theme = useTheme();

  const [people, setPeople] = useState([]);
  const [offline, setOffline] = useState(false);
  const [error, setError] = useState(null);
  const [visible, setVisible] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [selectedPersonName, setSelectedPersonName] = useState("");

  const fetchData = async () => {
    try {
      const data = await fetchPeople(setOffline);
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
      function showAddPerson() {
        props.navigation.navigate("PersonEditScreen", { id: -1 });
      }
      function showPersonEditScreen(id) {
        props.navigation.navigate("PersonEditScreen", { id: id });
      }
      // #endregion

      // #region Data Handling
      function showDialog(id, name) {
        setSelectedPerson(id);
        setSelectedPersonName(name);
        setVisible(true);
      }
      function hideDialog() { 
        setVisible(false);
        setSelectedPerson(null);
      }
      // #endregion

    async function handleDelete() {
      if (selectedPerson !== null) {
        try {
          const success = await deletePerson(selectedPerson);
          if (success) {
            fetchData();
            hideDialog();
          } else {
            setError("Failed to delete. Please try again.");
          }
        } catch (err) {
          console.error("Error deleting:", err);
          setError("Failed to delete. Check your connection.");
          hideDialog();
        }
      }
    }

  return (
    <Surface style={{flex:1, padding: 16}} mode="flat" elevation={1}>
      {/* Offline Mode */}
      {offline && (
        <View style={{
          backgroundColor: theme.colors.error,
          alignItems: "center",
          marginBottom: 10,
          borderRadius: 5,
        }}>
          <Text variant="bodyLarge" style={{ color: theme.colors.onError, paddingVertical: 12 }}>
            Offline Mode
          </Text>
        </View>
      )}
      <Text
        variant="headlineLarge"
        style={{
          marginHorizontal: 10,
          marginBottom: 24,
          fontWeight: "bold",
          color: theme.colors.primary,
          fontFamily: "Trebuchet MS, Calibri, Arial, sans-serif",
        }}
      >
        Staff Directory
      </Text>
      <ScrollView style={{flex: 1}}>
        {people.map((person) => (
          <View
            key={person.id}
            style={{
              flex: 1,
              flexDirection: "row",
              marginHorizontal: 10,
              marginTop: 10,
              borderColor: theme.colors.primary,
              borderWidth: 2,
              alignItems: "center",
              borderRadius: 10,
            }}
          >
            <View style={{ alignItems: "center", justifyContent: "center", paddingLeft:10 }}>
              { /* Avatar */}
              <TouchableOpacity onPress={() => showPersonViewScreen(person.id)}>
                <Avatar.Icon size={48} icon="folder-open-outline" />
              </TouchableOpacity>
            </View>
            <View style={{ flex: 1, marginLeft: 10, padding: 10 }}>
              { /* Main Content */}
              <Text variant="titleMedium" style={{fontFamily: "Trebuchet MS, Calibri, Arial, sans-serif", fontWeight: "bold"}}>{person.name}</Text>
              <Text variant="titleSmall" style={{fontFamily: "Trebuchet MS, Calibri, Arial, sans-serif",}}>{person.Department.name}</Text>
              <Text variant="titleMedium" style={{fontFamily: "Trebuchet MS, Calibri, Arial, sans-serif",}}>{person.phone}</Text>
            </View>
            <View>
              { /* Action Buttons */}
              <View>
                <View
                  style={{
                    flex: 1,
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <View
                    style={{
                      flex: 1,
                      alignItems: "center",
                      justifyContent: "flex-end",
                    }}
                  >
                    <IconButton icon="pencil" mode="contained" iconColor={theme.colors.onSecondary} size={24} onPress={() => { showPersonEditScreen(person.id) }} disabled={offline} />
                  </View>
                  <View
                    style={{
                      flex: 1,
                      alignItems: "center",
                      justifyContent: "flex-start",
                    }}
                  >
                    <IconButton icon="delete"  mode="contained" iconColor={theme.colors.onSecondary} size={24} onPress={() => { showDialog(person.id, person.name) }} disabled={offline} />
                  </View>
                </View>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
      <FAB
        icon="plus"
        onPress={() => showAddPerson()}
        disabled={offline}
        style={{ position: "absolute", margin: 16, right: 0, bottom: 0 }}
      />
      {/* Dialog for delete confirmation */}
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title style={{fontFamily: "Trebuchet MS, Calibri, Arial, sans-serif",}}>Confirm Deletion</Dialog.Title>
          <Dialog.Content>
            <Text style={{fontFamily: "Trebuchet MS, Calibri, Arial, sans-serif",}}>Are you sure you want to delete this employee?</Text>
            <Text style={{ fontFamily: "Trebuchet MS, Calibri, Arial, sans-serif", fontWeight: "bold" }}>{selectedPersonName}</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog} style={{fontFamily: "Trebuchet MS, Calibri, Arial, sans-serif",}}>Cancel</Button>
            <Button onPress={handleDelete} style={{fontFamily: "Trebuchet MS, Calibri, Arial, sans-serif",}}>Delete</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </Surface>
  )
}