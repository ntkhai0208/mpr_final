import React, { useContext, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { NoteContext } from '../context/NoteContext';

const FoldersScreen = ({ navigation }) => {
  const { folders, setFolders } = useContext(NoteContext);
  const [newFolder, setNewFolder] = useState('');

  const addFolderHandler = () => {
    setFolders([...folders, { id: `f${folders.length + 1}`, name: newFolder }]);
    setNewFolder('');
  };

  return (
    <View style={styles.screen}>
      <FlatList
        data={folders}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity>
            <View style={styles.folderItem}>
              <Text>{item.name}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
      <TextInput
        style={styles.input}
        placeholder="New Folder"
        value={newFolder}
        onChangeText={setNewFolder}
      />
      <TouchableOpacity style={styles.addButton} onPress={addFolderHandler}>
        <Text style={styles.addButtonText}>Add Folder</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f0f0f0',
  },
  folderItem: {
    padding: 10,
    marginVertical: 8,
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 5,
    borderRadius: 5,
  },
  addButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default FoldersScreen;
