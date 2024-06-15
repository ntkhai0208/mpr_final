import React, { useContext, useState } from 'react';
import { View, Text, TextInput, StyleSheet, FlatList, TouchableOpacity, Modal } from 'react-native';
import { NoteContext } from '../context/NoteContext';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const LabelsScreen = () => {
  const { labels, addLabel, editLabel, deleteLabel } = useContext(NoteContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState(null);
  const [labelText, setLabelText] = useState('');
  const navigation = useNavigation();

  const filteredLabels = labels.filter(label => 
    (label.name || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSaveLabel = () => {
    if (selectedLabel) {
      editLabel(selectedLabel.id, labelText);
    } else {
      addLabel(labelText);
    }
    setIsModalVisible(false);
    setLabelText('');
  };

  const handleDeleteLabel = () => {
    deleteLabel(selectedLabel.id);
    setIsModalVisible(false);
    setLabelText('');
  };

  const openEditModal = (label) => {
    setSelectedLabel(label);
    setLabelText(label.name);
    setIsModalVisible(true);
  };

  const openCreateModal = () => {
    setSelectedLabel(null);
    setLabelText('');
    setIsModalVisible(true);
  };

  return (
    <View style={styles.screen}>
      <View style={styles.navBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.navBarTitle}>Labels</Text>
      </View>
      <TextInput
        style={styles.searchInput}
        placeholder="Search or create label..."
        value={searchTerm}
        onChangeText={setSearchTerm}
      />
      <FlatList
        data={filteredLabels}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => openEditModal(item)}>
            <Text style={styles.label}>{item.name}</Text>
          </TouchableOpacity>
        )}
        ListHeaderComponent={() => (
          <TouchableOpacity onPress={openCreateModal}>
            <Text style={styles.createLabelButton}>+ Create label{searchTerm}</Text>
          </TouchableOpacity>
        )}
      />
      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TextInput
              style={styles.modalInput}
              value={labelText}
              onChangeText={setLabelText}
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity onPress={handleSaveLabel}>
                <Text style={styles.modalButton}>Save</Text>
              </TouchableOpacity>
              {selectedLabel && (
                <TouchableOpacity onPress={handleDeleteLabel}>
                  <Text style={styles.modalButton}>Delete</Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity onPress={() => setIsModalVisible(false)}>
                <Text style={styles.modalButton}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
    justifyContent: 'space-between',
    padding: 25,
    backgroundColor: '#fff',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
  },
  navBarTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    margin: 15,
  },
  label: {
    backgroundColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    margin: 5,
  },
  createLabelButton: {
    color: '#007AFF',
    margin: 15,
    textDecorationLine: 'underline',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  modalInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 15,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButton: {
    fontSize: 16,
    color: '#007AFF',
    padding: 10,
  },
});

export default LabelsScreen;
