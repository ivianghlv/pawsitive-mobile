import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    // Wait for 3 seconds before navigating to the next page
    const timer = setTimeout(() => {
      router.push('next1'); // Navigate to the next page (replace 'next1' with your route)
    }, 3000);

    // Cleanup the timer if the component is unmounted
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      {/* Keep your original image */}
      <Image source={require('../assets/Splash2.png')} style={styles.image} />
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
    height: 120,
  },
});
