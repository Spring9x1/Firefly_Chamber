import styles from '../style';
import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, Button, FlatList, StyleSheet, Image, ImageBackground, ScrollView, TouchableOpacity
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TodoPage = ({
  task, setTask, waktu, setWaktu,
  taskList, addTask, toggleDone, deleteTask, setCurrentPage
}) => (
  <View style={styles.container}>
    <Image source={require('../assets/image/1353722.jpeg')} style={styles.ImageBackground} resizeMode="cover" />
    <View style={styles.blackOverlay} />
    <View style={styles.box2}>
      <View style={styles.todoBox}>
        <ScrollView contentContainerStyle={{ paddingBottom: 20, flexGrow: 1 }}>
          <TouchableOpacity style={styles.backButton} onPress={() => setCurrentPage('profile')}>
            <Text style={styles.backButtonText}>← Back to Profile</Text>
          </TouchableOpacity>
          <Text style={styles.todoTitle}>📝 To-Do List</Text>
          <View style={styles.inputRow}>
            <TextInput style={styles.input} placeholder="Tulis tugas..." placeholderTextColor="#aaa" value={task} onChangeText={setTask} />
            <TextInput style={styles.input} placeholder="waktu..." placeholderTextColor="#aaa" value={waktu} onChangeText={setWaktu} />
            <Button title="Tambah" onPress={addTask} />
          </View>
        </ScrollView>

        <FlatList
          style={{ flexGrow: 1, maxHeight: 400 }}
          data={taskList}
          ListEmptyComponent={() => <Text style={{ color: '#ccc', textAlign: 'center', marginTop: 20 }}>Belum ada tugas</Text>}
          renderItem={({ item, index }) => (
            <View style={styles.taskItem}>
              <Text style={item.done ? styles.doneText : styles.normalText}>
                {item.done ? '✔️' : '⬜'} {item.text}
              </Text>
              <View style={styles.buttonGroup}>
                <Button title={item.done ? 'Batal' : 'Selesai'} onPress={() => toggleDone({ index })} />
                <Button title="Hapus" onPress={() => deleteTask({ index })} />
              </View>
            </View>
          )}
          keyExtractor={(_, index) => index.toString()}
        />
      </View>
    </View>
  </View>
);

export default TodoPage;
