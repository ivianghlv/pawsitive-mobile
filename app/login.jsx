import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Link, useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login() {
  // State for email, password, password visibility, and remember me option
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isRememberMeChecked, setIsRememberMeChecked] = useState(false);

  // Initialize the router
  const router = useRouter();

  // Load stored email when the component mounts
  useEffect(() => {
    const loadEmail = async () => {
      try {
        const storedEmail = await AsyncStorage.getItem('userEmail');
        if (storedEmail) {
          setEmail(storedEmail);
          setIsRememberMeChecked(true); // Check the Remember Me box if an email is found
        }
      } catch (error) {
        console.error('Failed to load email:', error);
      }
    };

    loadEmail();
  }, []);

  const handleLogin = async () => {
    // Make API call to log in the user
    fetch('http://192.168.130.209:3000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })
      .then(async (response) => {
        const data = await response.json();
        if (data.error) {
          Alert.alert('Login Failed', data.error); // Show error message
        } else {
          Alert.alert('Login Successful', data.message); // Show success message

          // Save token if available
          if (data.token) {
            await AsyncStorage.setItem('userToken', data.token);
          }

          // Save email if "Remember Me" is checked
          if (isRememberMeChecked) {
            await AsyncStorage.setItem('userEmail', email);
          } else {
            await AsyncStorage.removeItem('userEmail');
          }

          // Redirect to the home screen
          router.push('/home'); // Change '/home' to your home screen route
        }
      })
      .catch((error) => {
        console.error('Login error:', error);
        Alert.alert('Error', 'An error occurred. Please try again.');
      });
  };

  return (
    <View style={styles.container}>
      {/* Back Icon */}
      <Link href="/sign-up" style={styles.backButton}>
        <Image source={require('../assets/arrow.png')} style={styles.backIcon} />
      </Link>

      {/* Logo */}
      <Image source={require('../assets/Splash2.png')} style={styles.logo} />

      {/* Main Text */}
      <Text style={styles.mainText}>Log in to your account</Text>

      {/* Email Input */}
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#888"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail} // Update email state
      />

      {/* Password Input */}
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Password"
          placeholderTextColor="#888"
          secureTextEntry={!isPasswordVisible}
          value={password}
          onChangeText={setPassword} // Update password state
        />
        <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
          <Image source={require('../assets/eye-icon.png')} style={styles.eyeIcon} />
        </TouchableOpacity>
      </View>

      {/* Additional Links (Remember Me, Forgot Password) */}
      <View style={styles.rememberMeContainer}>
        <TouchableOpacity onPress={() => setIsRememberMeChecked(!isRememberMeChecked)} style={[styles.circle, isRememberMeChecked && styles.checkedCircle]} />
        <Text style={styles.rememberMeText}>Remember Me</Text>

        <TouchableOpacity>
          <Text style={styles.forgotPassword}>Forgot password?</Text>
        </TouchableOpacity>
      </View>

      {/* Log in Button */}
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Log in</Text>
      </TouchableOpacity>

      {/* Continue with Google Button */}
      <View style={styles.dividerContainer}>
        <Text style={styles.dividerText}>or continue with</Text>
      </View>

      <TouchableOpacity style={styles.googleButton}>
        <Image source={require('../assets/google-icon.png')} style={styles.googleIcon} />
        <Text style={styles.googleButtonText}>Continue with Google</Text>
      </TouchableOpacity>

      {/* Sign Up Link */}
      <TouchableOpacity>
        <Link href="/sign-up">
          <Text style={styles.signUpText}>
            Don't have an account? <Text style={styles.signUpLink}>Sign Up</Text>
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
    left: 28,
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
    marginTop: -144,
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
    marginBottom: 10,
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
  rememberMeContainer: {
    flexDirection: 'row', // Align items horizontally
    alignItems: 'center', // Center the items vertically
    marginBottom: 20,
  },
  circle: {
    height: 16,
    width: 16,
    borderRadius: 9, // Make it a circle
    borderWidth: 1,
    borderColor: '#888', // Grey border
    marginRight: 5, // Space between circle and text
  },
  checkedCircle: {
    backgroundColor: '#3b5998', // Background color when checked
  },
  rememberMeText: {
    fontSize: 12,
    color: '#888',
    marginRight: 105,
  },
  forgotPassword: {
    fontSize: 12,
    color: '#888',
  },
  loginButton: {
    backgroundColor: '#FFC107', // Yellow color for the login button
    width: '90%',
    height: 55,
    paddingVertical: 15,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  dividerContainer: {
    width: '90%',
    alignItems: 'center',
    marginVertical: 10,
    marginBottom: 30,
  },
  dividerText: {
    fontSize: 14,
    color: '#888',
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    paddingVertical: 15,
    borderRadius: 20,
    borderColor: '#E0E0E0',
    borderWidth: 2,
    justifyContent: 'center',
    marginBottom: 15,
  },
  googleIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  googleButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  signUpText: {
    fontSize: 14,
    color: '#888',
  },
  signUpLink: {
    color: '#3b5998',
    fontWeight: 'bold',
  },
});
