import styles from '../style';
import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, Button, FlatList, StyleSheet, Image, ImageBackground, ScrollView, TouchableOpacity
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TodoPage = ({
  task, setTask, waktu, setWaktu,
  taskList, addTask, toggleDone, deleteTask, setCurrentPage,
  handleCheckAll, handleUncheckAll, handleClearAll
}) => (
  <View style={styles.container}>
    <Image source={require('../assets/image/1353722.jpeg')} style={styles.ImageBackground} resizeMode="cover" />
    <View style={styles.blackOverlay} />
    <View style={styles.box2}>
      <View style={styles.todoBox}>
        <ScrollView contentContainerStyle={{ paddingBottom: 20, flexGrow: 1 }}>
          <TouchableOpacity style={styles.backButton} onPress={() => setCurrentPage('profile')}>
            <Text style={styles.backButtonText}>Back to Profile</Text>
          </TouchableOpacity>
          <Text style={styles.todoTitle}>To-Do List</Text>
          <Text style={styles.todoSubtext}>Quick!~ Go finish your tasks so we can hang out together!~</Text>
          <Text style={styles.todoSubtext2}>~Firefly~</Text>
          <View style={styles.inputRow}>
            <TextInput style={styles.input} placeholder="Tulis tugas..." placeholderTextColor="#aaa" value={task} onChangeText={setTask} />
            <TextInput style={styles.input} placeholder="waktu..." placeholderTextColor="#aaa" value={waktu} onChangeText={setWaktu} />
            <Button title="  Add  " onPress={addTask} />
          </View>
        </ScrollView>

        <FlatList
          style={{ flexGrow: 10, maxHeight: 500 }}
          data={taskList}
          ListEmptyComponent={() => <Text style={{ color: '#ccc', textAlign: 'center', marginTop: 20 }}>Belum ada tugas</Text>}
          renderItem={({ item, index }) => (
            <View style={styles.taskItem}>
              <View style={{ flex: 1 }}>
                <Text style={item.done ? styles.doneText : styles.normalText}>
                  {item.done ? '✔️' : '⬜'} {item.text}
                </Text>
                <Text style={styles.taskTime}>🕒 {item.waktu}</Text>
              </View>
              <View style={styles.iconRow}>
                <TouchableOpacity onPress={() => toggleDone({ index })}>
                  <Text style={styles.icon}>{item.done ? '🔄' : '✔️'}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => deleteTask(index)}>
                  <Text style={styles.icon}>❌</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          keyExtractor={(_, index) => index.toString()}
        />
  <View style={styles.buttonColumn}>
    <Button title="Check All" onPress={handleCheckAll} />
    <Button title="Uncheck All" onPress={handleUncheckAll} />
    <Button title="Delete/Clear All" onPress={handleClearAll} />
  </View>
      </View>
    </View>
  </View>
);

export default TodoPage;
