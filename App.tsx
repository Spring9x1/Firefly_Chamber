import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
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
      setTaskList([...taskList, { text: task, waktu, done: false }]);
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

  const sharedProps = {
    task, setTask, waktu, setWaktu,
    taskList, addTask, toggleDone, deleteTask, setCurrentPage,
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
