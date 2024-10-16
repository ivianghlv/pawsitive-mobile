import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { Link } from 'expo-router';

export default function Welcome() {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/Splash1.png')} style={styles.image} />
      <Text style={styles.text}>Welcome to Pawsitive</Text>
      
      <Link style={styles.a} href="next1">
        <Text style={{ fontSize: 16, color: 'white' }}>Get Started</Text>
      </Link>
      
      <TouchableOpacity>
        <Text style={styles.loginLink}>Already have an account? Log in</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3B5998',
  },
  image: {
    width: 200,
    height: 200,
  },
  text: {
    color: '#fff',
    fontSize: 24,
    marginTop: 20,
  },
  a: {
    padding: 15,
    backgroundColor: '#FFD700',
    borderRadius: 5,
    marginTop: 20,
  },
  loginLink: {
    fontSize: 16,
    color: '#3b5998',
    marginTop: 15,
  },
});
