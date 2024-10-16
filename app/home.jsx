import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native';
import React from 'react';
import { Link } from 'expo-router'; // Import Link component if routing is required

export default function AppointmentOverview() {
  return (
    <View style={styles.container}>
      {/* Logo */}
      <View style={styles.logoContainer}>
        <Image
          source={require('../assets/Splash2.png')} // Replace with your logo path
          style={styles.logo}
        />
      </View>

      {/* Search Bar */}
      <TextInput
        style={styles.searchBar}
        placeholder="Search..."
        placeholderTextColor="#888"
      />

      {/* Appointment Overview Section */}
      <Text style={styles.appointmentTitle}>Appointment Overview</Text>

      <ScrollView>
        <View style={styles.appointmentCard}>
          <View style={styles.appointmentImagePlaceholder} />
          <View style={styles.appointmentDetails}>
            <Text style={styles.petName}>Pet: Bogart</Text>
            <Text style={styles.appointmentText}>Services: Grooming</Text>
            <Text style={styles.appointmentText}>Location: Noah’s Ark</Text>
            <Text style={styles.appointmentText}>Date: March 25, 2024</Text>
            <Text style={styles.appointmentText}>Time: 03:00 PM</Text>
          </View>
        </View>

        {/* Another Appointment Card */}
        <View style={styles.appointmentCard}>
          <View style={styles.appointmentImagePlaceholder} />
          <View style={styles.appointmentDetails}>
            <Text style={styles.petName}>Pet: Bogart</Text>
            <Text style={styles.appointmentText}>Services: Grooming</Text>
            <Text style={styles.appointmentText}>Location: Noah’s Ark</Text>
            <Text style={styles.appointmentText}>Date: March 25, 2024</Text>
            <Text style={styles.appointmentText}>Time: 03:00 PM</Text>
          </View>
        </View>
      </ScrollView>

      {/* Book New Appointment Button */}
      <TouchableOpacity style={styles.bookButton}>
      <Link href="/reservation" style={styles.linkButton}> {/* Adjust this path based on your routes */} 
        <Text style={styles.bookButtonText}>BOOK NEW APPOINTMENT</Text>
      </Link>
      </TouchableOpacity>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <Link href="/home" style={styles.navButton}> {/* Adjust this path based on your routes */}
          <Image source={require('../assets/home-icon.png')} style={styles.navIcon} />
        </Link>
        <Link href="/reservation" style={styles.navButton}> {/* Adjust this path based on your routes */} 
          <Image source={require('../assets/clipboard-icon.png')} style={styles.navIcon} />
        </Link>
        <Link href="/reminder" style={styles.navButton}> {/* Adjust this path based on your routes */}
          <Image source={require('../assets/notifications-icon.png')} style={styles.navIcon} />
        </Link>
        <Link href="/profile" style={styles.navButton}> {/* Adjust this path based on your routes */}
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
    paddingHorizontal: 20,
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  logo: {
    marginTop: 11,
    width: 120,
    height: 40, // Adjust to your logo dimensions
    resizeMode: 'contain',
    left: '3%',
  },
  searchBar: {
    backgroundColor: '#F1F1F1',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 30,
    fontSize: 16,
  },
  appointmentTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  appointmentCard: {
    flexDirection: 'row',
    backgroundColor: '#F9F9F9',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  appointmentImagePlaceholder: {
    width: 100,
    height: 90,
    backgroundColor: '#D0D0D0',
    borderRadius: 10,
    marginRight: 15,
  },
  appointmentDetails: {
    justifyContent: 'center',
  },
  petName: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  appointmentText: {
    color: '#555',
    fontSize: 14,
  },
  bookButton: {
    backgroundColor: '#3B5998',
    paddingVertical: 15,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  bookButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
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
