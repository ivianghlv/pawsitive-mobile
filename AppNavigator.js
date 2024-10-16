import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Welcome from './screens/Welcome'; // Importing from the screens folder
import Next1 from './screens/Next1';     // Importing from the screens folder
import Next2 from './screens/Next2';     // Importing from the screens folder
// Add any other screens as needed, e.g., Next3, Next4, etc.

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="Next1" component={Next1} />
        <Stack.Screen name="Next2" component={Next2} />
        {/* Add more screens as necessary */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
