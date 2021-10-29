import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Inputs from '../components/Inputs';
import style from '../components/style';
import COLORS from '../components/color';
import {useState, useEffect} from 'react';

import {ScrollView} from 'react-native-gesture-handler';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  ImageBackground,
  StatusBar,
  BackHandler,
} from 'react-native';
import SQLite from 'react-native-sqlite-storage';
import axios from 'axios';

const signup = ({navigation}) => {
  const [signup, setsignup] = useState({
    course: 'GCC18038',
    username: 'trongnhan1',
    password: '0925980058Aa',
    macAddress: '90:97:F3:0A:51:64',
    uniqueId: 'bb8bb80547367289',
  });
  const [error, seterror] = useState('');
  const signupExample = async () => {
    try {
      const uniqueId = signup.uniqueId;
      const macAddress = signup.macAddress;
      const course = signup.course;
      const username = signup.username;
      const password = signup.password;
      const requestUrl = 'http://192.168.0.103:3000/user/signup';
      const response = await axios.post(requestUrl, {
        username: username,
        course: course,
        password: password,
        macAddress: macAddress,
        uniqueId: uniqueId,
      });
      if (response.data.status === 'SUCCESS') {
        Alert.alert(response.data.message);
      } else {
        console.log(response.data.status, error);
        seterror(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView
      style={{paddingHorizontal: 20, flex: 1, backgroundColor: '#e6cae1'}}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{flexDirection: 'row', marginTop: 40}}>
          <Text style={{fontWeight: 'bold', fontSize: 22, color: COLORS.dark}}>
            My
          </Text>
          <Text
            style={{fontWeight: 'bold', fontSize: 22, color: COLORS.secondary}}>
            App
          </Text>
        </View>
        <View style={{marginTop: 70}}>
          <Text style={{fontSize: 27, fontWeight: 'bold', color: COLORS.dark}}>
            Welcome Back,
          </Text>
          <Text style={{fontSize: 19, fontWeight: 'bold', color: COLORS.light}}>
            Sign up to continue
          </Text>
        </View>
        <View style={{marginTop: 20}}>
          <Inputs
            giatri={signup.username}
            name="Username"
            icon="user"
            changeText={text => setsignup({...signup, username: text})}
            pass={false}
            // changeText={text => setissignup({...issignup, username: text})}
            // giatri={issignup.username}
          />

          <Inputs
            giatri={signup.password}
            name="Password"
            icon="lock"
            changeText={text => setsignup({...signup, password: text})}
            pass={true}
            // changeText={text => setissignup({...issignup, username: text})}
            // giatri={issignup.username}
          />

          <Inputs
            giatri={signup.course}
            name="Course"
            icon="envelope"
            changeText={text => setsignup({...signup, course: text})}
            // changeText={text => setissignup({...issignup, username: text})}
            // giatri={issignup.username}
          />

          <Inputs
            giatri={signup.macAddress}
            name="MacAddress"
            icon="info"
            changeText={text => setsignup({...signup, macAddress: text})}
            // changeText={text => setissignup({...issignup, username: text})}
            // giatri={issignup.username}
          />

          <Inputs
            giatri={signup.uniqueId}
            name="UniqueId"
            icon="info"
            changeText={text => setsignup({...signup, uniqueId: text})}
            // changeText={text => setissignup({...issignup, username: text})}
            // giatri={issignup.username}
          />

          {error != '' ? (
            <Text style={styles.errorTextStyle}> {error} </Text>
          ) : null}
          <TouchableOpacity
            style={styles.loginBtn}
            onPress={() => signupExample()}>
            <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 18}}>
              Sign Up
            </Text>
          </TouchableOpacity>
          <View
            style={{
              marginVertical: 20,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View style={style.line}></View>
            <Text style={{marginHorizontal: 5, fontWeight: 'bold'}}>OR</Text>
            <View style={style.line}></View>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'flex-end',
            justifyContent: 'center',
            marginTop: 10,
            marginBottom: 20,
          }}>
          <Text style={{color: COLORS.light, fontWeight: 'bold'}}>
            Already have an account ?
          </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('login');
            }}>
            <Text style={{color: COLORS.pink, fontWeight: 'bold'}}>
              Sign in
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
var styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex: 1,
  },
  header: {
    flex: 1,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  imageBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  footer: {
    flex: 2,
    padding: 20,
  },
  loginBtn: {
    width: '100%',
    backgroundColor: '#93278f',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    marginTop: 20,
  },
  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
  },
});
export default signup;
