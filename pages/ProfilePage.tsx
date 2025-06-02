import styles from '../style';
import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, Button, FlatList, StyleSheet, Image, ImageBackground, ScrollView, TouchableOpacity
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfilePage = ({ setCurrentPage }) => (
  <View style={styles.container}>
    <Image source={require('../assets/image/1353722.jpeg')} style={styles.ImageBackground} resizeMode='cover' />
    <View style={styles.blackOverlay} />
    <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
      <View style={styles.box}>
        <View style={styles.profileBox}>
          <View style={styles.profileContainer}>
            <Image source={require('../assets/image/hsr-honkai.gif')} style={styles.avatar} />
            <Image source={require('../assets/image/Firefly_border.png')} style={styles.borderOverlay} />
          </View>
          <Text style={styles.profileName}>Evan_Verlanma</Text>
          <Text style={styles.profileId}>2311500069</Text>
          <Text style={styles.profileAge}>Aged (19)</Text>
          <Text style={styles.profileAddress}>Dream Edge - Penacony</Text>

          {/* Navigation Buttons */}
          <View style={styles.navigationButtons}>
            <View style={styles.navGroup}>
              <TouchableOpacity
                style={styles.navButton}
                onPress={() => setCurrentPage('todo')}
              >
                <View style={styles.samWrapper}>
                  <Image source={require('../assets/image/Sam_frame.png')} style={styles.samFrame} />
                </View>
                <Text style={styles.navButtonText}>To-Do Lists</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.navGroup}>
              <TouchableOpacity
                style={styles.navButton}
                onPress={() => setCurrentPage('other')}
              >
                <View style={styles.samWrapper}>
                  <Image source={require('../assets/image/Firefly_frame.png')} style={styles.samFrame} />
                </View>
                <Text style={styles.navButtonText}>Future Feature</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  </View>
);

export default ProfilePage;
