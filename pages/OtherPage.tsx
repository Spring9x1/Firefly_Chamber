import styles from '../style';
import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, Button, FlatList, StyleSheet, Image, ImageBackground, ScrollView, TouchableOpacity
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const OtherPage = ({ setCurrentPage }) => (
  <View style={styles.container}>
    <Image source={require('../assets/image/1353722.jpeg')} style={styles.ImageBackground} resizeMode='cover' />
    <View style={styles.blackOverlay} />

    <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
      <View style={styles.box2}>
        <View style={styles.otherBox}>
          <TouchableOpacity style={styles.backButton} onPress={() => setCurrentPage('profile')}>
            <Text style={styles.backButtonText}>Back to Profile</Text>
          </TouchableOpacity>
          <View style={styles.placeholderContent}>
            <Text style={styles.placeholderText}>This is where my future project for "Spring's Chamber"!</Text>
            <Text style={styles.placeholderSubtext}>I will add more things in the future as long as im still here.</Text>
          </View>

        </View>
      </View>
    </ScrollView>

  </View>
);

export default OtherPage;
