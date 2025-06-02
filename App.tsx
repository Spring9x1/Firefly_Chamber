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
      if (data) {
        const parsedTasks = JSON.parse(data);
        const sortedTasks = sortTasks(parsedTasks);
        setTaskList(sortedTasks);
      }
    };
    loadTasks();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem('tasks', JSON.stringify(taskList));
  }, [taskList]);

  const sortTasks = (tasks) => {
    return [...tasks].sort((a, b) => {
      if (a.done === b.done) return 0;
      return a.done - b.done;
    });
  }

  const addTask = () => {
    if (task.trim()) {
      const newTaskList = [...taskList, { text: task, waktu: waktu, done: false }];
      const sortedTasks = sortTasks(newTaskList);
      setTaskList(sortedTasks); 
      setTask('');
      setWaktu('');
    }
  };

  const toggleDone = ({ index }: { index: number }) => {
    const updated = [...taskList];
    updated[index].done = !updated[index].done;
    const sortedTasks = sortTasks(updated);
    setTaskList(sortedTasks); 
  };

  const deleteTask = ({ index }: { index: number }) => {
    const updated = [...taskList];
    updated.splice(index, 1);
    const sortedTasks = sortTasks(updated);
    setTaskList(sortedTasks); 
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
            const updatedTasks = taskList.map(task => ({ ...task, done: true }));
            const sortedTasks = sortTasks(updatedTasks);
            setTaskList(sortedTasks); // Fixed: proper implementation with auto-sorting
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
            const updatedTasks = taskList.map(task => ({ ...task, done: false }));
            const sortedTasks = sortTasks(updatedTasks);
            setTaskList(sortedTasks); 
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
    handleCheckAll, handleUncheckAll, handleClearAll, sortTasks
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
