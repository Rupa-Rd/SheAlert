import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { UserContext } from '../components/UserContext';
import BannerWithoutProfile from '../components/BannerWithoutProfile';

const Profile = () => {
  const { userDetails } = useContext(UserContext);

  return (
    <>
    <BannerWithoutProfile/>
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <Text>Name: {userDetails.fullName}</Text>
      <Text>Mobile Number: {userDetails.mobileNumber}</Text>
      <Text>Emergency Contact 1: {userDetails.emergencyContact1.name}</Text>
      <Text>Emergency Contact 2: {userDetails.emergencyContact2.name}</Text>
    </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: {  fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    marginTop: 10,},
});

export default Profile;
