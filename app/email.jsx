import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import React, { useState } from 'react';
import { Link, useRouter } from 'expo-router'; // Use useRouter for programmatic navigation

export default function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false); // Manage password visibility

  const router = useRouter(); // For navigation

  // Function to toggle password visibility
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  // Function to handle form submission
  const handleSignUp = async () => {
    if (!name || !email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    try {
      // Make an API request to save the user data in the database
      const response = await fetch('http://your-api-endpoint.com/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fullname: name, email, password }), // Adjust according to your backend API structure
      });

      if (response.ok) {
        Alert.alert('Success', 'Account created successfully!');
        router.push('/login'); // Navigate to the login page after successful signup
      } else {
        Alert.alert('Error', 'Failed to create account');
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong. Please try again.');
      console.error('Signup error:', error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Back Icon */}
      <Link href="/sign-up" style={styles.backButton}> {/* Directly use Link here */}
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
      <Text style={styles.mainText}>Create your account</Text>

      {/* Name Input */}
      <TextInput
        style={styles.input}
        placeholder="Name"
        placeholderTextColor="#888"
        value={name}
        onChangeText={setName}
      />

      {/* Email Input */}
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#888"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      {/* Password Input */}
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Password"
          placeholderTextColor="#888"
          secureTextEntry={!passwordVisible} // Toggle based on state
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity onPress={togglePasswordVisibility}>
          <Image
            source={require('../assets/eye-icon.png')} // Adjust path for eye icon
            style={styles.eyeIcon}
          />
        </TouchableOpacity>
      </View>

      {/* Password Info Text */}
      <Text style={styles.passwordInfo}>
        Use 8 or more characters with a mix of uppercase and lowercase letters, numbers, and symbols
      </Text>

      {/* Get Started Button */}
      <TouchableOpacity style={styles.getStartedButton} onPress={handleSignUp}>
        <Text style={styles.getStartedButtonText}>Get Started</Text>
      </TouchableOpacity>

      {/* Already Signed Up Link */}
      <TouchableOpacity>
        <Link href="/login">
          <Text style={styles.loginText}>
            Already signed up? <Text style={styles.loginLink}>Log in</Text>
          </Text>
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
    marginTop: -155,
    marginBottom: 60,
  },
  mainText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    width: '90%',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: '#fff',
    marginBottom: 20,
    fontSize: 16,
    borderWidth: 2,
    borderColor: '#E0E0E0',
  },
  passwordContainer: {
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 20,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#E0E0E0',
  },
  passwordInput: {
    flex: 1,
    paddingVertical: 15,
    paddingHorizontal: 20,
    fontSize: 16,
  },
  eyeIcon: {
    width: 20,
    height: 20,
    marginRight: 20,
  },
  passwordInfo: {
    fontSize: 10,
    color: '#888',
    width: '90%',
    marginBottom: 50,
    marginLeft: 90,
    marginRight: 75,
  },
  getStartedButton: {
    backgroundColor: '#FFC107',
    width: '90%',
    paddingVertical: 15,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  getStartedButtonText: {
    color: '#fff',
    fontSize: 25,
    fontWeight: 'bold',
  },
  loginText: {
    fontSize: 14,
    color: '#888',
  },
  loginLink: {
    color: '#3b5998',
    fontWeight: 'bold',
  },
});
