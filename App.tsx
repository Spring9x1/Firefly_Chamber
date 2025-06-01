import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  View, Alert, Text, TextInput, Button, FlatList, StyleSheet, Image, ImageBackground, ScrollView, TouchableOpacity
} from 'react-native';
import ProfilePage from './pages/ProfilePage';
import TodoPage from './pages/TodoPage';
import OtherPage from './pages/OtherPage';

export default function App() {
  const [task, setTask] = useState('');
  const [waktu, setWaktu] = useState('');
  const [taskList, setTaskList] = useState([]);
  const [currentPage, setCurrentPage] = useState('profile');

  useEffect(() => {
    const loadTasks = async () => {
      const data = await AsyncStorage.getItem('tasks');
      if (data) setTaskList(JSON.parse(data));
    };
    loadTasks();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem('tasks', JSON.stringify(taskList));
  }, [taskList]);

  const addTask = () => {
    if (task.trim()) {
      setTaskList([...taskList, { text: task, waktu: waktu, done: false }]);
      setTask('');
      setWaktu('');
    }
  };

  const toggleDone = ({ index }: { index: number }) => {
    const updated = [...taskList];
    updated[index].done = !updated[index].done;
    setTaskList(updated);
  };

  const deleteTask = ({ index }: { index: number }) => {
    const updated = [...taskList];
    updated.splice(index, 1);
    setTaskList(updated);
  };

  const handleCheckAll = () => {
    Alert.alert(
      'Check All',
      'Oh... Did you already finish all your tasks?',
      [
        {
          text: 'No',
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => {
            taskList.forEach((task, index) => {
              if (!task.done) {
                toggleDone({ index });
              }
            });
          },
        },
      ],
      { cancelable: false },
    );
  };

  const handleUncheckAll = () => {
    Alert.alert(
      'Uncheck All',
      'Eh..? your task not finished yet? did you lie or what?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            taskList.forEach((task, index) => {
              if (task.done) {
                toggleDone({ index });
              }
            });
          },
        },
      ],
      { cancelable: false },
    );
  };

  const handleClearAll = () => {
    Alert.alert(
      'Clear All Tasks',
      'Did you really wanna delete all your tasks? it will vanish just like planet glammoth.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete All',
          style: 'destructive',
          onPress: () => {
            setTaskList([]);
          },
        },
      ],
      { cancelable: false },
    );
  };

  const sharedProps = {
    task, setTask, waktu, setWaktu,
    taskList, addTask, toggleDone, deleteTask, setCurrentPage,
    handleCheckAll, handleUncheckAll, handleClearAll
  };

  switch (currentPage) {
    case 'todo':
      return <TodoPage {...sharedProps} />;
    case 'other':
      return <OtherPage setCurrentPage={setCurrentPage} />;
    default:
      return <ProfilePage setCurrentPage={setCurrentPage} />;
  }
}
