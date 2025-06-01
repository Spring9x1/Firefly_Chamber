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
    <ScrollView contentContainerStyle={styles.scrollContent}>
      <TouchableOpacity style={styles.backButton} onPress={() => setCurrentPage('profile')}>
        <Text style={styles.backButtonText}>← Back to Profile</Text>
      </TouchableOpacity>
      <Text style={styles.pageTitle}>Future feature</Text>
      <View style={styles.placeholderContent}>
        <Text style={styles.placeholderText}>This is where your next feature will go!</Text>
        <Text style={styles.placeholderSubtext}>You can add any new functionality here.</Text>
      </View>
    </ScrollView>
  </View>
);

export default OtherPage;
