import React, { useContext, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, TextInput, TouchableWithoutFeedback } from 'react-native';
import { NoteContext } from '../context/NoteContext';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { formatDistanceToNow } from 'date-fns';

const HomeScreen = () => {
  const { notes, labels } = useContext(NoteContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const navigation = useNavigation();

  const filteredNotes = notes.filter(note => note.content.toLowerCase().includes(searchTerm.toLowerCase()));

  const handleSearch = () => {
    setIsSearching(true);
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    setIsSearching(false);
  };

  const getLabelNames = (labelIds) => {
    return labelIds.map(labelId => labels.find(label => label.id === labelId)?.name).filter(Boolean);
  };

  return (
    <View style={styles.screen}>
      <View style={styles.navBar}>
        {isSearching ? (
          <>
            <TouchableWithoutFeedback onPress={handleClearSearch}>
              <View style={styles.iconContainer}>
                <Ionicons name="arrow-back" size={24} color="black" />
              </View>
            </TouchableWithoutFeedback>
            <TextInput
              style={styles.searchInput}
              placeholder="Search Notes"
              value={searchTerm}
              onChangeText={setSearchTerm}
              autoFocus
            />
            <TouchableWithoutFeedback onPress={handleClearSearch}>
              <View style={styles.iconContainer}>
                <Ionicons name="close" size={24} color="black" />
              </View>
            </TouchableWithoutFeedback>
          </>
        ) : (
          <>
            <TouchableWithoutFeedback onPress={() => navigation.openDrawer()}>
              <View style={styles.iconContainer}>
                <Ionicons name="menu" size={24} color="black" />
              </View>
            </TouchableWithoutFeedback>
            <Text style={styles.navBarTitle}>Notes App</Text>
            <TouchableWithoutFeedback onPress={handleSearch}>
              <View style={styles.iconContainer}>
                <Ionicons name="search" size={24} color="black" />
              </View>
            </TouchableWithoutFeedback>
          </>
        )}
      </View>
      {isSearching && (
        <View style={styles.searchInfoContainer}>
          <Text style={styles.searchInfoText}>{filteredNotes.length} notes found</Text>
        </View>
      )}
      {filteredNotes.length > 0 ? (
        <FlatList
          data={filteredNotes}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            const labelNames = getLabelNames(item.labelIds);
            return (
              <TouchableOpacity onPress={() => navigation.navigate('EditNoteScreen', { noteId: item.id })}>
                <View style={[styles.noteItem, { borderColor: item.color }]}>
                  <View style={styles.noteHeader}>
                    <View style={styles.noteLabels}>
                      {getLabelNames(item.labelIds).map((label, index) => (
                        <Text key={index} style={styles.noteLabel}>{label}</Text>
                      ))}
                    </View>
                    {item.isBookmarked && <Ionicons name="bookmark" size={24} color="black" />}
                  </View>
                  <Text>{item.content}</Text>
                  <Text style={styles.noteTime}>Edited {formatDistanceToNow(new Date(item.updateAt), { addSuffix: true })}</Text>
                </View>
              </TouchableOpacity>
            );
          }}
          ListHeaderComponent={() => (
            <View style={styles.headerContainer}>
              <Text style={styles.headerText}>{filteredNotes.length} notes</Text>
            </View>
          )}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>
            {isSearching ? 'Not found!' : 'Please add a new note'}
          </Text>
        </View>
      )}
      <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('NewNoteScreen')}>
        <Ionicons name="add" size={30} color="white" />
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
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: '#fff',
    elevation: 3, // Add shadow for Android
    shadowColor: '#000', // Add shadow for iOS
    shadowOffset: { width: 0, height: 2 }, // Add shadow for iOS
    shadowOpacity: 0.2, // Add shadow for iOS
  },
  iconContainer: {
    padding: 10,
  },
  navBarTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 10,
    borderRadius: 5,
  },
  searchInfoContainer: {
    padding: 10,
  },
  searchInfoText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  noteItem: {
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 10,
    borderColor: 'g',
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
  addButton: {
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
  headerContainer: {
    padding: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  headerText: {
    fontSize: 16,
    fontWeight: 'bold',
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
});

export default HomeScreen;
