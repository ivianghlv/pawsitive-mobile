import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { Link } from 'expo-router';

export default function SignUp() {
  return (
    <View style={styles.container}>
      {/* Back Icon */}
      <Link href="/next3" style={styles.backButton}> {/* Directly use Link here */}
        <Image
          source={require('../assets/arrow.png')} // Adjust path for your back icon
          style={styles.backIcon}
        />
      </Link>

      {/* Logo */}
      <Image
        source={require('../assets/Splash2.png')} // Adjust path for your Pet Med logo
        style={styles.logo}
      />

      {/* Main Text */}
      <Text style={styles.mainText}>Sign up for free</Text>
      <Text style={styles.description}>
        Pet Med makes it easier to help people manage their pets' health records.
      </Text>

      {/* Sign up with Email Button */}
      <Link href="/email" style={styles.emailButton}> 
        <Text style={styles.emailButtonText}>Sign up with email</Text>
      </Link>

      {/* OR Divider */}
      <Text style={styles.orText}>or</Text>

      {/* Google Button */}
      <TouchableOpacity style={styles.googleButton}>
        <Image
          source={require('../assets/google-icon.png')}  // Adjust path for the Google icon
          style={styles.googleIcon}
        />
        <Link href="/google"> {/* Adjust href to your login route */}
          <Text style={styles.googleButtonText}>Continue with Google</Text>
        </Link>
      </TouchableOpacity>

      {/* Already Signed Up Link */}
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
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF', // White background
    paddingHorizontal: 20,
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 25,
    // Add padding to ensure the image is fully visible
    padding: 5, // Optional: Adjust padding as needed
  },
  backIcon: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  logo: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
    marginTop: -306,
    marginBottom: 60,
  },
  mainText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
    marginBottom: 40,
    marginLeft: 40,
    marginRight: 40,
  },
  emailButton: {
    backgroundColor: '#FFC107', // Yellow color for the button
    width: '90%',
    paddingVertical: 15,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    marginBottom: 20,
  },
  emailButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  orText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 20,
  },
  googleButton: {
    width: '90%',
    paddingVertical: 15,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  googleIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  googleButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#555',
  },
  loginText: {
    fontSize: 14,
    color: '#888',
    marginTop: 5,
  },
  loginLink: {
    color: '#3b5998',
    fontWeight: 'bold',
  },
});
