import styles from '../style';
import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, Button, FlatList, StyleSheet, Image, ImageBackground, ScrollView, TouchableOpacity
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TodoPage = ({
  task, setTask, waktu, setWaktu,
  taskList, addTask, toggleDone, deleteTask, setCurrentPage,
  handleCheckAll, handleUncheckAll, handleClearAll, sortTasks
}) => (
  <View style={styles.container}>
    <Image source={require('../assets/image/1353722.jpeg')} style={styles.ImageBackground} resizeMode="cover" />
    <View style={styles.blackOverlay} />
    <View style={styles.box2}>
      <View style={styles.todoBox}>
        <ScrollView contentContainerStyle={{ marginBottom: 30, paddingBottom: 20, flexGrow: 1 }} scrollEnabled = {false}>
          <TouchableOpacity style={styles.backButton} onPress={() => setCurrentPage('profile')}>
            <Text style={styles.backButtonText}>Back to Profile</Text>
          </TouchableOpacity>
          <Text style={styles.todoTitle}>To-Do List</Text>
          <Text style={styles.todoSubtext}>Quick!~ Go finish your tasks so we can hang out together!~</Text>
          <Text style={styles.todoSubtext2}>~Firefly~</Text>
          <View style={styles.inputRow}>
            <TextInput style={styles.input} placeholder="Tulis tugas..." placeholderTextColor="#aaa" value={task} onChangeText={setTask} />
            <TextInput style={styles.input} placeholder="waktu..." placeholderTextColor="#aaa" value={waktu} onChangeText={setWaktu} />
            <TouchableOpacity style={styles.checkButton}>
              <Text style={styles.buttonText} onPress={addTask}>Add</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        <FlatList
          style={{ flexGrow: 10, maxHeight: 200 }}
          data={taskList}
          ListEmptyComponent={() => <Text style={{ fontFamily: 'Chewy-Regular', color: '#ccc', textAlign: 'center', marginTop: 20 }}>Belum ada tugas</Text>}
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
          <TouchableOpacity style={styles.checkButton} onPress={handleCheckAll}>
            <Text style={styles.buttonText}>Check All</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.checkButton} onPress={handleUncheckAll}>
            <Text style={styles.buttonText}>Uncheck All</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.checkButton} onPress={handleClearAll}>
            <Text style={styles.buttonText}>Delete/Clear All </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  </View>
);

export default TodoPage;
