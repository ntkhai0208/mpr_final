import Note from '../models/Note';
import Label from '../models/Label';

export const LABELS = [
  new Label('l1', 'React Native'),
  new Label('l2', 'Final Exam'),
  new Label('l3', 'Mini Project'),
  new Label('l4', 'Team Work'),
  new Label('l5', 'React Basics'),
];

export const COLORS = ['Lightseagreen', 'Skyblue', 'Lightcoral', 'Lightpink', 'Lightgreen', 'Lightblue', 'Orange', 'Palegreen'];

export const NOTES = [
  new Note('n1', null, ['l1', 'l2'], 'Final Project Preparation', new Date('2024-05-12T12:30:00'), false),
  new Note('n2', COLORS[3], ['l2'], 'For our mini project', new Date('2024-05-12T12:30:00'), true),
  new Note('n3', COLORS[4], ['l2'], 'Second note!', new Date('2024-04-20T15:30:00'), false),
  new Note('n4', COLORS[5], ['l1'], 'Ok the first note here!', new Date('2023-04-20T12:25:00'), false),
  new Note('n5', COLORS[6], ['l1', 'l4'], 'Learn React Native Navigation', new Date('2024-05-13T14:30:00'), true),
  new Note('n6', null, ['l1', 'l2'], 'A simple note', new Date('2024-05-24T15:30:00'), false),
  new Note('n7', COLORS[6], ['l1', 'l2', 'l3', 'l4'], 'One more note', new Date('2024-04-20T15:30:00'), false),
];

export const TRASH = [
  new Note('t1', COLORS[0], ['l1', 'l4'], 'Trashed note', new Date('2024-05-13T14:30:00'), true),
];
