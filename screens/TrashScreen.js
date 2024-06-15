import React, { useContext, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Modal, Alert } from 'react-native';
import { NoteContext } from '../context/NoteContext';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const TrashScreen = () => {
  const { trash, restoreNote, deleteNotePermanently, restoreAllNotes, emptyTrash, labels } = useContext(NoteContext);
  const [selectedNote, setSelectedNote] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigation = useNavigation();

  const handleNotePress = (note) => {
    setSelectedNote(note);
    setIsModalVisible(true);
  };

  const handleRestore = () => {
    if (selectedNote) {
      restoreNote(selectedNote.id);
    }
    setIsModalVisible(false);
  };

  const handleDeletePermanently = () => {
    if (selectedNote) {
      deleteNotePermanently(selectedNote.id);
    }
    setIsModalVisible(false);
  };

  const handleRestoreAll = () => {
    Alert.alert(
      "Restore All",
      "Are you sure you want to restore all notes?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Restore All",
          onPress: () => {
            restoreAllNotes();
          },
          style: "default"
        }
      ]
    );
  };

  const handleEmptyTrash = () => {
    Alert.alert(
      "Empty Trash",
      "Are you sure you want to permanently delete all notes in the trash?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Empty",
          onPress: () => emptyTrash(),
          style: "destructive"
        }
      ]
    );
  };

  const getLabelName = (labelId) => {
    const label = labels.find(l => l.id === labelId);
    return label ? label.name : '';
  };

  const renderNote = ({ item }) => (
    <TouchableOpacity onPress={() => handleNotePress(item)}>
      <View style={styles.noteItem}>
        <View style={styles.noteHeader}>
          <Text style={styles.noteLabels}>{item.labelIds.map(labelId => getLabelName(labelId)).join(', ')}</Text>
          {item.isBookmarked && <Ionicons name="bookmark" size={24} color="black" />}
        </View>
        <Text>{item.content}</Text>
        <Text style={styles.noteTime}>{new Date(item.updateAt).toLocaleString()}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.screen}>
      <View style={styles.navBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.navBarTitle}>Trash</Text>
      </View>
      <View style={styles.actionButtonsContainer}>
        <Text style={styles.noteCount}>{trash.length} notes in trash</Text>
        <View style={styles.buttonsRow}>
          <TouchableOpacity style={styles.restoreAllButton} onPress={restoreAllNotes}>
            <Text style={styles.restoreAllButtonText}>Restore All</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.emptyTrashButton} onPress={emptyTrash}>
            <Text style={styles.emptyTrashButtonText}>Empty Trash</Text>
          </TouchableOpacity>
        </View>
      </View>
      {trash.length > 0 ? (
        <FlatList
          data={trash}
          keyExtractor={(item) => item.id}
          renderItem={renderNote}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Trash is empty</Text>
        </View>
      )}
      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Options</Text>
            <TouchableOpacity style={styles.modalButton} onPress={handleRestore}>
              <Text style={styles.modalButtonText}>Restore</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton} onPress={handleDeletePermanently}>
              <Text style={styles.modalButtonText}>Delete Permanently</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton} onPress={() => setIsModalVisible(false)}>
              <Text style={styles.modalButtonText}>Cancel</Text>
            </TouchableOpacity>
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
    padding: 15,
    backgroundColor: '#fff',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
  },
  navBarTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    position: 'absolute',
    left: '50%',
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  buttonsRow: {
    flexDirection: 'row',
  },
  noteCount: {
    fontSize: 16,
    color: '#007AFF',
  },
  restoreAllButton: {
    padding: 10,
    backgroundColor: 'gray',
    borderRadius: 5,
    marginRight: 10,
  },
  restoreAllButtonText: {
    color: 'white',
    fontSize: 16,
  },
  emptyTrashButton: {
    padding: 10,
    backgroundColor: 'red',
    borderRadius: 5,
  },
  emptyTrashButtonText: {
    color: 'white',
    fontSize: 16,
  },
  noteItem: {
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 10,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderRadius: 5,
  },
  noteHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  noteLabels: {
    flexDirection: 'row',
  },
  noteLabel: {
    backgroundColor: '#ddd',
    borderRadius: 5,
    padding: 5,
    marginRight: 5,
  },
  noteTime: {
    fontSize: 12,
    color: '#888',
    marginTop: 5,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: '#888',
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
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalButton: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    width: '100%',
    alignItems: 'center',
  },
  modalButtonText: {
    fontSize: 16,
    color: '#007AFF',
  },
});

export default TrashScreen;