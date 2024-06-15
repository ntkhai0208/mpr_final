import React, { useContext, useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NoteContext } from '../context/NoteContext';

const ManageLabelsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { noteId } = route.params;
  const { labels, notes, editNote } = useContext(NoteContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLabels, setSelectedLabels] = useState([]);
  const [note, setNote] = useState(null);

  useEffect(() => {
    const currentNote = notes.find(note => note.id === noteId);
    if (currentNote) {
      setNote(currentNote);
      setSelectedLabels(currentNote.labelIds || []);
    }
  }, [noteId, notes]);

  const handleLabelToggle = (labelId) => {
    setSelectedLabels(prevSelectedLabels => 
      prevSelectedLabels.includes(labelId)
        ? prevSelectedLabels.filter(id => id !== labelId)
        : [...prevSelectedLabels, labelId]
    );
  };

  const handleSave = () => {
    if (note) {
      editNote(note.id, note.content, note.color, selectedLabels, note.isBookmarked);
      navigation.goBack();
    }
  };

  const filteredLabels = labels.filter(label =>
    label.name && label.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <View style={styles.screen}>
      <View style={styles.navBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.navBarButton}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.navBarTitle}>Manage Labels</Text>
        <TouchableOpacity onPress={handleSave}>
          <Text style={styles.navBarButton}>Save</Text>
        </TouchableOpacity>
      </View>
      <TextInput
        style={styles.searchInput}
        placeholder="Search or create label..."
        value={searchTerm}
        onChangeText={setSearchTerm}
      />
      <ScrollView contentContainerStyle={styles.labelsContainer}>
        {filteredLabels.map(label => (
          <TouchableOpacity
            key={label.id}
            style={[
              styles.label,
              selectedLabels.includes(label.id) && styles.selectedLabel
            ]}
            onPress={() => handleLabelToggle(label.id)}
          >
            <Text style={styles.labelText}>{label.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
  },
  navBarButton: {
    fontSize: 16,
    color: '#007AFF',
  },
  navBarTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 15,
    paddingLeft: 10,
    borderRadius: 5,
  },
  labelsContainer: {
    padding: 15,
  },
  label: {
    padding: 10,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
  },
  selectedLabel: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  labelText: {
    color: '#fff',
  },
});

export default ManageLabelsScreen;
