import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import React, { useState } from 'react';
import { Link, useRouter } from 'expo-router';

export default function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);

  const router = useRouter();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  // Function to validate the password
  const isPasswordValid = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSignUp = async () => {
    if (!name || !email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (!isPasswordValid(password)) {
      Alert.alert('Error', 'Password must be at least 8 characters long and include uppercase letters, lowercase letters, numbers, and symbols.');
      return;
    }

    try {
      const response = await fetch('http://192.168.130.209:3000/api/sign-up', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }), // Adjusted to match backend
      });

      if (response.ok) {
        Alert.alert('Success', 'Account created successfully!');
        router.push('/login');
      } else {
        const errorData = await response.json();
        Alert.alert('Error', errorData.error || 'Failed to create account');
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong. Please try again.');
      console.error('Signup error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Link href="/sign-up" style={styles.backButton}>
        <Image source={require('../assets/arrow.png')} style={styles.backIcon} />
      </Link>

      <Image source={require('../assets/Splash2.png')} style={styles.logo} />
      <Text style={styles.mainText}>Create your account</Text>

      <TextInput
        style={styles.input}
        placeholder="Name"
        placeholderTextColor="#888"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#888"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Password"
          placeholderTextColor="#888"
          secureTextEntry={!passwordVisible}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity onPress={togglePasswordVisibility}>
          <Image source={require('../assets/eye-icon.png')} style={styles.eyeIcon} />
        </TouchableOpacity>
      </View>

      <Text style={styles.passwordInfo}>
        Use 8 or more characters with a mix of uppercase and lowercase letters, numbers, and symbols
      </Text>

      <TouchableOpacity style={styles.getStartedButton} onPress={handleSignUp}>
        <Text style={styles.getStartedButtonText}>Get Started</Text>
      </TouchableOpacity>

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
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 25,
    padding: 5,
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
