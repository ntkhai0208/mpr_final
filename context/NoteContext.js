import React, { createContext, useState } from 'react';
import { NOTES, LABELS, TRASH, COLORS } from '../data/dummy-data';

export const NoteContext = createContext();

const NoteProvider = ({ children }) => {
  const [notes, setNotes] = useState(NOTES);
  const [labels, setLabels] = useState(LABELS);
  const [trash, setTrash] = useState(TRASH);
  const [folders, setFolders] = useState([]);

  const addNote = (content, color, labelIds) => {
    const newNote = { id: `n${notes.length + 1}`, color: color || COLORS[Math.floor(Math.random() * COLORS.length)], labelIds: labelIds || [], content, updateAt: new Date(), isBookmarked: false };
    setNotes(currentNotes => [...currentNotes, newNote]);
  };

  const editNote = (id, newContent, newColor, newLabelIds, isBookmarked) => {
    setNotes(currentNotes => currentNotes.map(note =>
      note.id === id ? { ...note, content: newContent, color: newColor, labelIds: newLabelIds, isBookmarked } : note
    ));
  };

  const deleteNote = (id) => {
    const noteToDelete = notes.find(note => note.id === id);
    setNotes(currentNotes => currentNotes.filter(note => note.id !== id));
    setTrash(currentTrash => [...currentTrash, noteToDelete]);
  };

  const restoreNote = (id) => {
    const noteToRestore = trash.find(note => note.id === id);
    setTrash(currentTrash => currentTrash.filter(note => note.id !== id));
    setNotes(currentNotes => [...currentNotes, noteToRestore]);
  };

  const deleteNotePermanently = (id) => {
    setTrash(currentTrash => currentTrash.filter(note => note.id !== id));
  };

  const restoreAllNotes = () => {
    setNotes(currentNotes => [...currentNotes, ...trash]);
    setTrash([]);
  };

  const emptyTrash = () => {
    setTrash([]);
  };

  const addLabel = (labelName) => {
    const newLabel = { id: `l${labels.length + 1}`, name: labelName };
    setLabels(currentLabels => [...currentLabels, newLabel]);
  };

  const editLabel = (id, newName) => {
    setLabels(currentLabels => currentLabels.map(label =>
      label.id === id ? { ...label, name: newName } : label
    ));
  };

  const deleteLabel = (id) => {
    setLabels(currentLabels => currentLabels.filter(label => label.id !== id));
    setNotes(currentNotes => currentNotes.map(note => ({
      ...note,
      labelIds: note.labelIds.filter(labelId => labelId !== id)
    })));
  };

  const getLabelNames = (labelIds) => {
    return labelIds.map(labelId => {
      const label = labels.find(label => label.id === labelId);
      return label ? label.name : '';
    });
  };

  return (
    <NoteContext.Provider value={{ notes, labels, trash, folders, setFolders, addNote, editNote, deleteNote, restoreNote, deleteNotePermanently, restoreAllNotes, emptyTrash, addLabel, editLabel, deleteLabel, getLabelNames }}>
      {children}
    </NoteContext.Provider>
  );
};

export default NoteProvider;
