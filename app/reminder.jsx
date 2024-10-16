import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { Link } from 'expo-router';

export default function NotificationScreen() {
  const [selectedTab, setSelectedTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState(''); // State for search input

  const notifications = [
    { id: 1, title: 'Bogart is ready for pickup.', time: '5 minutes ago' },
    { id: 2, title: 'Max has been vaccinated.', time: '10 minutes ago' },
    { id: 3, title: 'Your appointment is confirmed.', time: '30 minutes ago' },
  ];

  const renderNotifications = () =>
    notifications.map((notification) => (
      <View key={notification.id} style={styles.notificationCard}>
        <View style={styles.iconPlaceholder}></View>
        <View>
          <Text style={styles.notificationTitle}>PET MED:</Text>
          <Text style={styles.notificationText}>{notification.title}</Text>
          <Text style={styles.notificationTime}>{notification.time}</Text>
        </View>
      </View>
    ));

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        {/* Blue Header */}
        <View style={styles.header}>
          <Image source={require('../assets/Splash2.png')} style={styles.logo} />

          {/* Search bar inside the header */}
          <View style={styles.searchContainer}>
            <Image source={require('../assets/search-icon.png')} style={styles.searchIcon} />
            <TextInput
              style={styles.searchTextInput}
              placeholder="Search..."
              placeholderTextColor="#888"
              value={searchQuery}
              onChangeText={(text) => setSearchQuery(text)} // Update state with user input
            />
          </View>
        </View>

        {/* White container with border-radius on top */}
        <View style={styles.whiteContainer}>
          {/* Tabs (All/Unread) */}
          <View style={styles.tabsContainer}>
            <TouchableOpacity
              style={[styles.tab, selectedTab === 'all' && styles.activeTab]}
              onPress={() => setSelectedTab('all')}
            >
              <Text style={[styles.tabText, selectedTab === 'all' && styles.activeTabText]}>
                All
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tab, selectedTab === 'unread' && styles.activeTab]}
              onPress={() => setSelectedTab('unread')}
            >
              <Text style={[styles.tabText, selectedTab === 'unread' && styles.activeTabText]}>
                Unread
              </Text>
            </TouchableOpacity>
          </View>

          {/* Notifications */}
          <View style={styles.notificationContainer}>{renderNotifications()}</View>
        </View>
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
    backgroundColor: '#3B5998',
    padding: 10,
    paddingBottom: 20, // extra padding for search bar space
    height: '30%',
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
    position: 'absolute',
    top: 10,
    left: '39%',
    marginTop: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 10,
    marginHorizontal: 10,
    marginTop: 80,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  searchIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  searchTextInput: {
    flex: 1, // Take the remaining space
    color: '#000', // Text color
  },
  whiteContainer: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 20,
    flex: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
    marginTop: -50,
  },
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    marginHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 20,
  },
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 20,
  },
  activeTab: {
    backgroundColor: '#F1F1F1',
    width: 180,
  },
  tabText: {
    fontSize: 16,
    color: '#888',
  },
  activeTabText: {
    color: '#3B5998',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  notificationContainer: {
    paddingHorizontal: 20,
  },
  notificationCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  iconPlaceholder: {
    width: 50,
    height: 50,
    backgroundColor: '#E0E0E0',
    borderRadius: 10,
    marginRight: 15,
  },
  notificationTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#3B5998',
  },
  notificationText: {
    color: '#555',
    fontSize: 14,
  },
  notificationTime: {
    fontSize: 12,
    color: '#888',
    marginTop: 5,
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
