import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import { makeRedirectUri } from 'expo-auth-session';

// This is needed to handle the redirect from the Google Sign-In page
WebBrowser.maybeCompleteAuthSession();

export default function GoogleSignIn() {
  const [userInfo, setUserInfo] = useState(null);

  // Initialize Google Auth Request
  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: '956757033249-b1774j52pptvpf59ov5kqoddprigar6n.apps.googleusercontent.com', // Use your Google Client ID here
    redirectUri: makeRedirectUri({
      useProxy: true, // Ensure it is using the Expo proxy
    }),
  });

  // Handle Google Response
  useEffect(() => {
    if (response?.type === 'success') {
      const { authentication } = response;
      fetchUserInfo(authentication.accessToken);
    }
  }, [response]);

  // Fetch user info from Google
  const fetchUserInfo = async (token) => {
    try {
      const response = await fetch('https://www.googleapis.com/userinfo/v2/me', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const user = await response.json();
      setUserInfo(user);
    } catch (error) {
      console.log('Error fetching Google user info', error);
    }
  };

  // Automatically prompt Google Sign-In when the component mounts
  useEffect(() => {
    if (request) {
      promptAsync(); // Trigger Google Sign-In flow automatically
    }
  }, [request]);

  // Render user information if available
  return (
    <View style={styles.container}>
      {userInfo ? (
        <View style={styles.userInfo}>
          <Image source={{ uri: userInfo.picture }} style={styles.profilePic} />
          <Text style={styles.userName}>Hello, {userInfo.name}!</Text>
          <Text>Email: {userInfo.email}</Text>
        </View>
      ) : (
        <Text style={styles.loadingText}>Loading...</Text>
      )}
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
  userInfo: {
    alignItems: 'center',
  },
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  loadingText: {
    fontSize: 18,
    color: '#555',
  },
});
