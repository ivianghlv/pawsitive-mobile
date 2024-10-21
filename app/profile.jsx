import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Link } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ProfileScreen() {
  const [user, setUser] = useState(null);
  const [pets, setPets] = useState([
    { id: 1, name: 'Bogart', records: 0, reminders: 0 },
    { id: 2, name: 'Fluffy', records: 1, reminders: 2 },
    { id: 3, name: 'Max', records: 3, reminders: 1 },
  ]);

  // Fetch user details when the component mounts
  useEffect(() => {
    fetchUserDetails();
  }, []);

  const fetchUserDetails = async () => {
    try {
      const userData = await AsyncStorage.getItem('userDetails');
      if (userData) {
        setUser(JSON.parse(userData));
      } else {
        console.error('No user data found');
      }
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  const renderPets = () =>
    pets.map((pet) => (
      <View key={pet.id} style={styles.petCard}>
        <View style={styles.iconPlaceholder}></View>
        <View style={styles.petInfo}>
          <Text style={styles.petName}>{pet.name}</Text>
          <Text style={styles.petRecords}>{pet.records} records</Text>
          <Text style={styles.petReminders}>{pet.reminders} reminders</Text>
          <View style={styles.petButtons}>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Add record</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.editButton]}>
              <Text style={styles.buttonText}>Edit Card</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    ));

  return (
    <View style={styles.container}>
      {/* Blue Header */}
      <View style={styles.header}>
        <Text style={styles.profileTitle}>Profile</Text>
      </View>

      {/* Main Content Container */}
      <View style={styles.contentContainer}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {/* Profile Information */}
          <View style={styles.profileContainer}>
            <View style={styles.profileRow}>
              <Image source={require('../assets/profile-icon.png')} style={styles.profileImage} />
              <View style={styles.profileTextContainer}>
                <Text style={styles.profileName}>{user ? user.name : 'Loading...'}</Text>
                <Text style={styles.profileEmail}>{user ? user.email : 'Loading...'}</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.editProfileButton}>
              <Link href="/edit" style={styles.editProfileButtonText}>
                <Text style={styles.editProfileButtonText}>Edit Profile</Text>
              </Link>
            </TouchableOpacity>
          </View>

          {/* My Pets Section */}
          <View style={styles.myPetsContainer}>
            <Text style={styles.myPetsTitle}>My Pets</Text>
            <TouchableOpacity style={styles.addPetButton}>
              <Link href="/addpet" style={styles.addPetButtonText}>
                <Text style={styles.addPetButtonText}>Add Pet</Text>
              </Link>
            </TouchableOpacity>
          </View>

          <View style={styles.petsContainer}>{renderPets()}</View>

          {/* Logout Button */}
          <TouchableOpacity style={styles.logoutButton}>
            <Link href="/login" style={styles.logoutButtonText}>
              <Text style={styles.logoutButtonText}>Log Out</Text>
            </Link>
          </TouchableOpacity>
        </ScrollView>
      </View>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <Link href="/home" style={styles.navButton}>
          <Image source={require('../assets/home-icon.png')} style={styles.navIcon} />
        </Link>
        <Link href="/reservation" style={styles.navButton}>
          <Image source={require('../assets/clipboard-icon.png')} style={styles.navIcon} />
        </Link>
        <Link href="/reminder" style={styles.navButton}>
          <Image source={require('../assets/notifications-icon.png')} style={styles.navIcon} />
        </Link>
        <Link href="/profile" style={styles.navButton}>
          <Image source={require('../assets/profile-icon.png')} style={styles.navIcon} />
        </Link>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    backgroundColor: '#3B5998',
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    height: '15%',
  },
  profileTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    flex: 1,
    textAlign: 'center',

  },
  contentContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    elevation: 5,
    marginTop: -25,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 80,
  },
  profileContainer: {
    alignItems: 'flex-start',
    marginVertical: 20,
    paddingHorizontal: 20,
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#E0E0E0',
  },
  profileTextContainer: {
    marginLeft: 15,
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  profileEmail: {
    fontSize: 16,
    color: '#888',
  },
  editProfileButton: {
    marginTop: 10,
    backgroundColor: '#3B5998',
    paddingVertical: 10,
    borderRadius: 20,
    alignSelf: 'flex-start',
    width: '100%',
  },
  editProfileButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  myPetsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  myPetsTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  addPetButton: {
    backgroundColor: '#3B5998',
    paddingVertical: 10,
    borderRadius: 20,
    width: '30%',
    alignItems: 'center',
  },
  addPetButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  petsContainer: {
    paddingHorizontal: 20,
  },
  petCard: {
    flexDirection: 'row',
    backgroundColor: '#F9F9F9',
    borderRadius: 15,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  iconPlaceholder: {
    width: 50,
    height: 50,
    backgroundColor: '#E0E0E0',
    borderRadius: 10,
    marginRight: 15,
  },
  petInfo: {
    flex: 1,
  },
  petName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#3B5998',
  },
  petRecords: {
    fontSize: 14,
    color: '#555',
  },
  petReminders: {
    fontSize: 14,
    color: '#555',
  },
  petButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  button: {
    backgroundColor: '#FFC107',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  editButton: {
    marginLeft: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  logoutButton: {
    marginTop: 20,
    marginLeft: '55%',
    backgroundColor: '#FFC107',
    paddingVertical: 10,
    borderRadius: 20,
    alignItems: 'center',
    height: '7%',
    width: '40%',
  },
  logoutButtonText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#3B5998',
    borderRadius: 40,
    marginBottom: 20,
    height: 70,
    width: 344,
    marginLeft: 20,
  },
  navButton: {
    flex: 1,
    alignItems: 'center', // Centers the icon within the button
    top: -15,
    marginLeft: 10,
  },
  navIcon: {
    width: 44,
    height: 44,
    marginTop: -3,
  },
});
