import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Alert, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function EditProfileScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [photo, setPhoto] = useState(null);
  const [userId, setUserId] = useState(''); // Set this to the logged-in user's ID

  useEffect(() => {
    const fetchUserProfile = async () => {
      // Assuming you have a way to get the logged-in user's ID
      const loggedInUserId = 'user-id-here'; // Replace this with actual logic to get logged-in user ID
      setUserId(loggedInUserId); // Set userId to use in the updateProfile function

      try {
        const response = await fetch(`http://192.168.130.209:3000/api/user/profile/${loggedInUserId}`); // Adjust API endpoint
        const data = await response.json();

        // Populate state with user data
        if (data.success) {
          setName(data.user.name);
          setEmail(data.user.email);
          setPhoto(data.user.photo);
        } else {
          Alert.alert('Error', data.error);
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserProfile();
  }, []);

  useEffect(() => {
    // Request camera roll permissions on component mount
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission to access camera roll is required!');
      }
    })();
  }, []);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setPhoto(result.assets[0].uri); // Use the URI of the selected image
    }
  };

  const updateProfile = async () => {
    const formData = new FormData();
    formData.append('userId', userId);
    formData.append('name', name);
    formData.append('email', email);
    formData.append('password', password); // Handle password securely
    if (photo) {
      formData.append('photo', {
        uri: photo,
        type: 'image/jpeg', // Adjust based on the image type
        name: 'photo.jpg', // You can set a dynamic name if needed
      });
    }

    try {
      const response = await fetch('http://192.168.130.209:3000/api/user/profile', {
        method: 'PUT',
        body: formData,
      });
      const data = await response.json();
      if (data.success) {
        Alert.alert('Success', 'Profile updated successfully');
        navigation.goBack();
      } else {
        Alert.alert('Error', data.error);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Profile</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity onPress={pickImage} style={styles.uploadButton}>
        <Text style={styles.uploadButtonText}>Upload Image</Text>
      </TouchableOpacity>
      {photo && <Image source={{ uri: photo }} style={styles.image} />}
      <TouchableOpacity style={styles.button} onPress={updateProfile}>
        <Text style={styles.buttonText}>Save Changes</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 30,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#3B5998',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginVertical: 20,
  },
  uploadButton: {
    borderColor: '#3B5998',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 40,
    borderWidth: 2, // Thickness of the border
    borderStyle: 'solid', // Type of border (optional; default is 'solid')
  },
  uploadButtonText: {
    fontWeight: 'bold',
  },
});
