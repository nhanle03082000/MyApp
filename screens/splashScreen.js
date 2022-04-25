/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import AsyncStorage from '@react-native-async-storage/async-storage';
import LottieView from 'lottie-react-native';
import React, {useRef, useEffect} from 'react';
import {useState} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  Dimensions,
  Animated,
  ActivityIndicator,
} from 'react-native';

const splashScreen = ({navigation}) => {
  const [animating, setAnimating] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setAnimating(true);
      //Check if user_id is set or not
      //If not then send for Authentication
      //else send to Home Screen
      AsyncStorage.getItem('userId').then(userId =>
        navigation.replace(userId === null ? 'loginandsignup' : 'drawerscreen'),
      );
    }, 1000); // loading in 5s
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'red',
      }}>
      <LottieView
        source={require('../asset/42618-welcome.json')}
        autoPlay
        loop
      />
      <ActivityIndicator
        style={styles.styleActivity}
        animating={animating}
        color="black"
        size="large"
      />
    </View>
  );
};

export default splashScreen;

export const styles = StyleSheet.create({
  styleActivity: {
    marginTop: 100,
  },
});
//   <Text style={{fontSize: 27, fontWeight: 'bold', color: COLORS.dark}}>
//     Welcome Back,
//   </Text>;
