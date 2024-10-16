import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, Button, ScrollView, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Link } from 'expo-router'; // Import Link component if routing is required

export default function ReservationScreen() {
  const [selectedPet, setSelectedPet] = useState();
  const [selectedService, setSelectedService] = useState();
  
  // State for Date Picker
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  // State for Time Picker
  const [time, setTime] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const onTimeChange = (event, selectedTime) => {
    const currentTime = selectedTime || time;
    setShowTimePicker(Platform.OS === 'ios');
    setTime(currentTime);
  };

  const formatDate = (date) => {
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };

  const formatTime = (date) => {
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${hours}:${paddedMinutes} ${ampm}`;
  };

  return (
    <View style={styles.container}>
      {/* Header with Image */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Image
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <Image
          source={require('../assets/Splash2.png')} // Assuming logo.png is your replacement for 'PetMed' text
          style={styles.logo}
        />
      </View>

      {/* Blue Section (Optional for Styling) */}
      <View style={styles.blueHeader}></View>

      {/* Scrollable Form */}
      <ScrollView style={styles.formContainer} contentContainerStyle={{ paddingBottom: 20 }}>
        {/* Pet Picker */}
        <Text style={styles.label}>Choose your Pet</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedPet}
            onValueChange={(itemValue) => setSelectedPet(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Select Pet" value="" />
            <Picker.Item label="Bogart" value="bogart" />
            <Picker.Item label="Max" value="max" />
          </Picker>
        </View>

        {/* Service Picker */}
        <Text style={styles.label}>Type Of Services</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedService}
            onValueChange={(itemValue) => setSelectedService(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Select Services" value="" />
            <Picker.Item label="Grooming" value="grooming" />
            <Picker.Item label="Vaccination" value="vaccination" />
          </Picker>
        </View>

        {/* Description */}
        <Text style={styles.label}>Description</Text>
        <TextInput
          style={styles.description}
          placeholder="Describe the issue or service required"
          placeholderTextColor="#888"
          multiline
        />

        {/* Date Picker */}
        <Text style={styles.label}>Select Date</Text>
        <TouchableOpacity style={styles.datePickerContainer} onPress={() => setShowDatePicker(true)}>
          <Text style={styles.datePickerText}>{formatDate(date)}</Text>
        </TouchableOpacity>

        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={onDateChange}
          />
        )}

        {/* Time Picker */}
        <Text style={styles.label}>Select Time</Text>
        <TouchableOpacity style={styles.timePickerContainer} onPress={() => setShowTimePicker(true)}>
          <Text style={styles.timePickerText}>{formatTime(time)}</Text>
        </TouchableOpacity>

        {showTimePicker && (
          <DateTimePicker
            value={time}
            mode="time"
            display="default"
            is24Hour={false}
            onChange={onTimeChange}
          />
        )}

        {/* Submit Button */}
        <TouchableOpacity style={styles.submitButton}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <Link href="/home" style={styles.navButton}> {/* Adjust this path based on your routes */}
          <Image source={require('../assets/home-icon.png')} style={styles.navIcon} />
        </Link>
        <Link href="/reservation" style={styles.navButton}> {/* Adjust this path based on your routes */} 
          <Image source={require('../assets/clipboard-icon.png')} style={styles.navIcon} />
        </Link>
        <Link href="/reminder" style={styles.navButton}> {/* Adjust this path based on your routes */}
          <Image source={require('../assets/notifications-icon.png')} style={styles.navIcon} />
        </Link>
        <Link href="/profile" style={styles.navButton}> {/* Adjust this path based on your routes */}
          <Image source={require('../assets/profile-icon.png')} style={styles.navIcon} />
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#3B5998',
  },
  backIcon: {
    width: 40,
    height: 40,
    marginTop: 20,
  },
  logo: {
    width: 120,
    height: 40,
    resizeMode: 'contain',
    marginRight: 112,
    marginTop: 20,
  },
  blueHeader: {
    backgroundColor: '#3B5998',
    height: 60,
  },
  formContainer: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
    marginTop: -40,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#555',
  },
  pickerContainer: {
    backgroundColor: '#F1F1F1',
    borderRadius: 10,
    marginBottom: 20,
    paddingHorizontal: 15,
    height: 50,
    justifyContent: 'center',
  },
  picker: {
    height: 50,
    color: '#555',
  },
  description: {
    backgroundColor: '#F1F1F1',
    borderRadius: 10,
    padding: 10,
    fontSize: 16,
    marginBottom: 20,
    height: 180,
    textAlignVertical: 'top',
    color: '#555',
  },
  datePickerContainer: {
    backgroundColor: '#F1F1F1',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#3B5998',
  },
  datePickerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3B5998',
  },
  timePickerContainer: {
    backgroundColor: '#F1F1F1',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#3B5998',
  },
  timePickerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3B5998',
  },
  submitButton: {
    backgroundColor: '#FFC107',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 100,
  },
  submitButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#3B5998',
    borderRadius: 40,
    marginBottom: 20,
    height: 70,
    width: 344,
    marginLeft: 20,
  },
  navButton: {
    flex: 1,
    alignItems: 'center', // Centers the icon within the button
    top: -15,
    marginLeft: 10,
  },
  navIcon: {
    width: 44,
    height: 44,
    marginTop: -3,
  },
});
