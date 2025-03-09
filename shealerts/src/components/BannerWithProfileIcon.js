import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import the FontAwesome icon library
import { useNavigation } from '@react-navigation/native';

const BannerWithProfileIcon = () => {
    const navigation = useNavigation();
    const handleIconPress = () => {
        navigation.navigate('Profile'); // Navigates to the Profile screen
      };
  return (
    <View style={styles.container}>
      <View style={styles.bannerContainer}>
        <Text style={styles.banner}>SheAlert</Text>
        {/* Profile icon on the right using FontAwesome */}
        <TouchableOpacity onPress={handleIconPress}>
          <Icon name="user" size={30} color="black" style={styles.profileIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: 'white',
  },
  bannerContainer: {
    flexDirection: 'row', // Makes the container a row
    justifyContent: 'space-between', // Spaces out the items (banner text and icon)
    alignItems: 'center', // Aligns the items vertically centered
    paddingVertical: 12, // Adjusted padding to reduce height
    backgroundColor: 'red',
    paddingHorizontal: 15, // Adds horizontal padding
    marginTop: 30,
  },
  banner: {
    fontSize: 25,
    color: 'black',
    fontFamily: 'Martin monospace',
    fontWeight: 'bold',
    
  },
  profileIcon: {
    marginLeft: 10, // Optional: Adds some space between the text and the icon
  },
});

export default BannerWithProfileIcon;
