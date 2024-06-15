import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { NoteContext } from '../context/NoteContext';
import { COLORS } from '../data/dummy-data';

const EditNoteScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { noteId } = route.params;
  const { notes, editNote, deleteNote, getLabelNames } = useContext(NoteContext);
  const [note, setNote] = useState(null);
  const [content, setContent] = useState('');
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [color, setColor] = useState('');
  const [labelIds, setLabelIds] = useState([]);
  
  useEffect(() => {
    const currentNote = notes.find(note => note.id === noteId);
    if (currentNote) {
      setNote(currentNote);
      setContent(currentNote.content);
      setIsBookmarked(currentNote.isBookmarked);
      setColor(currentNote.color);
      setLabelIds(currentNote.labelIds);
    }
  }, [noteId, notes]);

  const handleSave = () => {
    editNote(noteId, content, color, labelIds, isBookmarked);
    navigation.goBack();
  };

  const handleDelete = () => {
    deleteNote(noteId);
    navigation.goBack();
  };

  const handleBookmarkToggle = () => {
    setIsBookmarked(!isBookmarked);
    editNote(noteId, content, color, labelIds, !isBookmarked);
  };

  const openManageLabels = () => {
    setIsModalVisible(false); // Close the modal first
    navigation.navigate('ManageLabelsScreen', { noteId });
  };

  const labelNames = getLabelNames(labelIds);

  return (
    <View style={styles.screen}>
      <View style={styles.navBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.navBarTitle}>Note</Text>
        <TouchableOpacity onPress={handleSave}>
          <Ionicons name="checkmark" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.labelsContainer}>
          {labelNames.map((label, index) => (
            <Text key={index} style={styles.noteLabel}>{label}</Text>
          ))}
          <TouchableOpacity onPress={openManageLabels}>
            <Text style={[styles.noteLabel, styles.manageLabelsButton]}>+ Manage labels</Text>
          </TouchableOpacity>
        </View>
        <TextInput
          style={[styles.input, { backgroundColor: color }]}
          value={content}
          onChangeText={setContent}
          multiline
        />
      </ScrollView>
      <View style={styles.bottomTab}>
        <Text style={styles.noteTime}>
          Edited {new Date(note?.updateAt).toLocaleString()}
          {color && <View style={[styles.colorDot, { backgroundColor: color }]} />}
        </Text>
        <TouchableOpacity onPress={handleBookmarkToggle}>
          <Ionicons name={isBookmarked ? "bookmark" : "bookmark-outline"} size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setIsModalVisible(true)}>
          <Ionicons name="ellipsis-horizontal" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Options</Text>
            <ScrollView horizontal contentContainerStyle={styles.colorOptions}>
              {COLORS.map(c => (
                <TouchableOpacity
                  key={c}
                  style={[styles.colorOption, { backgroundColor: c }]}
                  onPress={() => setColor(c)}
                />
              ))}
            </ScrollView>
            <View style={styles.labelsContainer}>
              {labelNames.map((label, index) => (
                <Text key={index} style={styles.noteLabel}>{label}</Text>
              ))}
              <TouchableOpacity onPress={openManageLabels}>
                <Text style={[styles.noteLabel, styles.manageLabelsButton]}>+ Manage labels</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.modalButton}>
              <Ionicons name="clipboard" size={20} color="black" />
              <Text style={styles.modalButtonText}>Copy to Clipboard</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton}>
              <Ionicons name="share-social" size={20} color="black" />
              <Text style={styles.modalButtonText}>Share</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton} onPress={handleDelete}>
              <Ionicons name="trash" size={20} color="black" />
              <Text style={styles.modalButtonText}>Delete Note</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton}>
              <Ionicons name="copy" size={20} color="black" />
              <Text style={styles.modalButtonText}>Make a copy</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton}>
              <Ionicons name="pin" size={20} color="black" />
              <Text style={styles.modalButtonText}>Pin</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton}>
              <Ionicons name="alarm" size={20} color="black" />
              <Text style={styles.modalButtonText}>Add a reminder</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton} onPress={() => setIsModalVisible(false)}>
              <Text style={styles.modalButtonText}>Close</Text>
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
  contentContainer: {
    padding: 20,
  },
  labelsContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  noteLabel: {
    backgroundColor: '#ddd',
    borderRadius: 5,
    padding: 5,
    marginRight: 5,
  },
  manageLabelsButton: {
    color: '#007AFF',
    marginLeft: 5,
    textDecorationLine: 'none',
  },
  input: {
    flex: 1,
    fontSize: 18,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#fff',
    padding: 10,
  },
  bottomTab: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    backgroundColor: '#fff',
  },
  noteTime: {
    fontSize: 12,
    color: '#888',
    flexDirection: 'row',
    alignItems: 'center',
  },
  colorDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginLeft: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  colorOptions: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  colorOption: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginHorizontal: 5,
  },
  modalButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  modalButtonText: {
    fontSize: 16,
    marginLeft: 10,
    color: '#007AFF',
  },
});

export default EditNoteScreen;
