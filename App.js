import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import AppNavigator from './AppNavigator';  // Import AppNavigator

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" />
      <AppNavigator />  {/* Render the navigation container */}
    </SafeAreaView>
  );
}
