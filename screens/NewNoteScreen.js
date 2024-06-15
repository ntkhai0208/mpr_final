import React, { useState, useContext } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { NoteContext } from '../context/NoteContext';

const NewNoteScreen = () => {
  const navigation = useNavigation();
  const { addNote } = useContext(NoteContext);
  const [content, setContent] = useState('');

  const handleSave = () => {
    addNote(content);
    navigation.goBack();
  };

  return (
    <View style={styles.screen}>
      <View style={styles.navBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.navBarTitle}>New note</Text>
      </View>
      <TextInput
        style={styles.input}
        placeholder="This is a simple note!"
        value={content}
        onChangeText={setContent}
        multiline
      />
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Ionicons name="checkmark" size={30} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  navBar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 25,
    backgroundColor: '#fff',
    elevation: 3, // Add shadow for Android
    shadowColor: '#000', // Add shadow for iOS
    shadowOffset: { width: 0, height: 2 }, // Add shadow for iOS
    shadowOpacity: 0.2, // Add shadow for iOS
  },
  navBarTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  input: {
    flex: 1,
    margin: 20,
    padding: 10,
    fontSize: 18,
    borderColor: 'gray',
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  saveButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: '#007AFF',
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3, // Add shadow for Android
    shadowColor: '#000', // Add shadow for iOS
    shadowOffset: { width: 0, height: 2 }, // Add shadow for iOS
    shadowOpacity: 0.2, // Add shadow for iOS
  },
});

export default NewNoteScreen;
