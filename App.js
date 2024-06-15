import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './screens/HomeScreen';
import NewNoteScreen from './screens/NewNoteScreen';
import EditNoteScreen from './screens/EditNoteScreen';
import ManageLabelsScreen from './screens/ManageLabelsScreen';
import LabelsScreen from './screens/LabelsScreen';
import TrashScreen from './screens/TrashScreen';
import FoldersScreen from './screens/FoldersScreen';

import NoteProvider from './context/NoteContext';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const MainStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="HomeScreen" component={HomeScreen} />
    <Stack.Screen name="NewNoteScreen" component={NewNoteScreen} />
    <Stack.Screen name="EditNoteScreen" component={EditNoteScreen} />
    <Stack.Screen name="ManageLabelsScreen" component={ManageLabelsScreen} />
    <Stack.Screen name="TrashScreen" component={TrashScreen} />
  </Stack.Navigator>
);

export default function App() {
  return (
    <NoteProvider>
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
          <Drawer.Screen name="Home" component={MainStack} />
          <Drawer.Screen name="Labels" component={LabelsScreen} />
          <Drawer.Screen name="Folders" component={FoldersScreen} />
          <Drawer.Screen name="Trash" component={TrashScreen} />
        </Drawer.Navigator>
      </NavigationContainer>
    </NoteProvider>
  );
}
