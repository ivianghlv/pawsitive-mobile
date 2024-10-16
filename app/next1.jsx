import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { Link } from 'expo-router';

export default function Next1() {
  return (
    <View style={styles.container}>
      {/* Logo and image at the top */}
      <Image 
        source={require('../assets/Onboarding1.png')} // Make sure the path is correct
        style={styles.logoImage} 
      />
      
      {/* Text content */}
      <Text style={styles.h1}>Track your pet’s medical records</Text>
      <Text style={styles.subtitle}>Keep your vaccines, deworming, and microchip in one place.</Text>

      {/* "Next" button */}
      <Link style={styles.nextButton} href="/next2">
        <Text style={styles.nextButtonText}>Next</Text>
      </Link>

      {/* Log in link */}
      <TouchableOpacity>
      <Link href="/login"> {/* Adjust href to your login route */}
        <Text style={styles.loginText}>Already signed up? <Text style={styles.loginLink}>Log in</Text></Text>
      </Link>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',  // Adjust spacing between items
    alignItems: 'center',
    paddingVertical: 50,
    backgroundColor: '#FFFFFF',  // White background
  },
  logoImage: {
    width: 330,  // Adjust to fit the logo and image correctly
    height: 400,
    resizeMode: 'contain',
    marginTop: 10,  // Add spacing from the top
  },
  h1: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#333333',
    textAlign: 'center',
    paddingHorizontal: 20,
    marginTop: 15, // Add space below the image
  },
  subtitle: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
    paddingHorizontal: 30,
    marginTop: 10,
    marginLeft: 50,
    marginRight: 50,
  },
  nextButton: {
    width: '80%',
    paddingVertical: 15,
    backgroundColor: '#FFC107',  // Matching yellow button
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',  // Explicitly center the text
    marginTop: 10,
  },
  nextButtonText: {
    fontSize: 25,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  loginLink: {
    fontSize: 14,
    color: '#3b5998',  // Matching blue color for the login text
    marginTop: 40,
    marginBottom: 40,  // Add space at the bottom
    textAlign: 'center',
  },
  loginLink: {
    color: '#3b5998',
    fontWeight: 'bold',
  },
});
