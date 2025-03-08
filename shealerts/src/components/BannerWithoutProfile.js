import { StyleSheet,  Button} from 'react-native';
import { View, Text} from 'react-native'
import React from 'react';

const BannerWithoutProfile = () => {
   
      return (
        <View style={styles.container}>
          <View >
            <Text style={styles.banner}>  SheAlert</Text>
          </View>
          
         
        </View>
      )
}

const styles = StyleSheet.create({
    container: {
      width: '100%',
      backgroundColor: 'white',
    },
    banner: {
      fontSize: 25,
      color: 'black',
      backgroundColor: 'red',
      fontFamily: 'Martin monospace',
      paddingVertical: 12, // Adjusted padding to reduce the height
      textAlign: 'left',
      fontWeight: 'bold',
      marginTop: 30,
    }
  });
  
export default BannerWithoutProfile;