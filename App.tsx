import styles from './style';
import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, Button, FlatList, StyleSheet, Image, ImageBackground, ScrollView, TouchableOpacity
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const [task, setTask] = useState('');
  const [waktu, setWaktu] = useState('');
  const [taskList, setTaskList] = useState([]);
  const [currentPage, setCurrentPage] = useState('profile');

  useEffect(() => {
    saveTasks();
  }, [taskList]);

  const loadTasks = async () => {
    const data = await AsyncStorage.getItem('tasks');
    console.log({ data });
    if (data) setTaskList(JSON.parse(data));
  }

  const saveTasks = async () => {
    await AsyncStorage.setItem('tasks', JSON.stringify(taskList));
  }

  const addTask = () => {
    if (task.trim()) {
      setTaskList([...taskList, { text: task, done: false }]);
      setTask('');
    }
  }

  const toggleDone = ({ index }: {
    index: number;
  }) => {
    const updated = [...taskList];
    updated[index].done = !updated[index].done;
    setTaskList(updated);
  }

  const deleteTask = ({ index }: {
    index: number;
  }) => {
    const updated = [...taskList];
    updated.splice(index, 1);
    setTaskList(updated);
  }
  // Profile Page Component
  const ProfilePage = () => (
    <View style={styles.container}>
      <Image
        source={require('./assets/image/1353722.jpeg')}
        style={styles.ImageBackground}
        resizeMode='cover'
      />
      <View style={styles.blackOverlay} />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.box}>
          <View style={styles.profileBox}>
            <View style={styles.profileContainer}>
              <Image source={require('./assets/image/hsr-honkai.gif')} style={styles.avatar} />
              <Image source={require('./assets/image/Firefly_border.png')} style={styles.borderOverlay} />
            </View>
            <Text style={styles.profileName}>Spring_Haru</Text>
            <Text style={styles.profileId}>2311500069</Text>
            <Text style={styles.profileAge}>Aged (19)</Text>
            <Text style={styles.profileAddress}>Firefly's Secret Base - Dream Edge - Penacony</Text>

            {/* Navigation Buttons */}
            <View style={styles.navigationButtons}>
              <TouchableOpacity
                onPress={() => setCurrentPage('todo')}
              >
                <ImageBackground source={require('./assets/image/Fireflypfp.jpg')} style={styles.navImg}>
                  <Text style={styles.navButtonText}>To-Do Lists</Text>
                </ImageBackground>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.navButton}
                onPress={() => setCurrentPage('other')}
              >
                <Text style={styles.navButtonText}>Future Feature</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView >
    </View >
  );

  // Todo Page Component
  const TodoPage = () => (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => setCurrentPage('profile')}
      >
        <Text style={styles.backButtonText}>← Back to Profile</Text>
      </TouchableOpacity>
      <Text style={styles.header}>📝 To-Do List</Text>
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Tulis tugas..."
          value={task}
          onChangeText={setTask}
        />
        <Button title="Tambah" onPress={addTask} />
      </View>
      <FlatList
        data={taskList}
        renderItem={({ item, index }) => (
          <View style={styles.taskItem}>
            <Text style={item.done ? styles.doneText : styles.normalText}>
              {item.done ? '✔️' : '⬜'} {item.text}
            </Text>
            <View style={styles.buttonGroup}>
              <Button title={item.done ? 'Batal' : 'Selesai'} onPress={() => toggleDone({ index: index })} />
              <Button title="Hapus" onPress={() => deleteTask({ index: index })} />
            </View>
          </View>
        )}
        keyExtractor={(_, index) => index.toString()}
      />
    </View>
  );

  // Other Feature Page Component (placeholder for future feature)
  const OtherPage = () => (
    <View style={styles.container}>
      <Image
        source={require('./assets/image/1353722.jpeg')}
        style={styles.ImageBackground}
        resizeMode='cover'
      />
      <View style={styles.blackOverlay} />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Back Button */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => setCurrentPage('profile')}
        >
          <Text style={styles.backButtonText}>← Back to Profile</Text>
        </TouchableOpacity>

        {/* Page Title */}
        <Text style={styles.pageTitle}>Future feature</Text>

        {/* Placeholder Content */}
        <View style={styles.placeholderContent}>
          <Text style={styles.placeholderText}>
            This is where your next feature will go!
          </Text>
          <Text style={styles.placeholderSubtext}>
            You can add any new functionality here.
          </Text>
        </View>
      </ScrollView>
    </View>
  );

  // Main render based on current page
  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'profile':
        return <ProfilePage />;
      case 'todo':
        return <TodoPage />;
      case 'other':
        return <OtherPage />;
      default:
        return <ProfilePage />;
    }
  };

  return renderCurrentPage();
}