import React from 'react';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Inputs from '../components/Inputs';
import style from '../components/style';
import COLORS from '../components/color';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

import {
  ScrollView,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  ImageBackground,
  StatusBar,
} from 'react-native';

import {useState, useEffect} from 'react';
const login2 = ({navigation}) => {
  const [isLogin, setisLogin] = useState({
    username: '',
    password: '',
  });
  const [error, seterror] = useState('');

  const loginExample = async () => {
    try {
      const user = isLogin.username;
      console.log(user);
      const pass = isLogin.password;
      console.log(pass);
      const requestUrl =
        'https://greenwich-attendance.herokuapp.com/auth/login';
      const response = await axios.post(requestUrl, {
        username: user,
        password: pass,
      });
      console.log('fsadfsa', response);
      if (response.data) {
        const idUser = response.data.data;
        console.log('data tra ve::', idUser);
        await AsyncStorage.setItem('userId', JSON.stringify(idUser));
        navigation.push('drawerscreen');
        console.log(response.data.token);
      } else {
        console.log(response.data.error);
        seterror(response.data.error);
        console.log(error);
      }
    } catch (error) {
      Alert.alert('Incorrect credentials');
    }
  };

  const [isIcon, setisIcon] = useState(true);
  const [isScurityEntry, setisScurityEntry] = useState(true);
  return (
    // <View style={styles.container}>
    //   <StatusBar barStyle="light-content" />
    //   <View style={styles.header}>
    //     <ImageBackground
    //       source={require('../asset/header.png')}
    //       style={styles.imageBackground}>
    //       <View style={{flexDirection: 'row', marginTop: 10}}>
    //         <Text
    //           style={{fontWeight: 'bold', fontSize: 22, color: COLORS.dark}}>
    //           My
    //         </Text>
    //         <Text
    //           style={{
    //             fontWeight: 'bold',
    //             fontSize: 22,
    //             color: COLORS.secondary,
    //           }}>
    //           App
    //         </Text>
    //       </View>
    //       <Text style={{fontSize: 19, fontWeight: 'bold', color: COLORS.light}}>
    //         Sign up to continue
    //       </Text>
    //       {/* <Text
    //         style={{
    //           color: 'white',
    //           fontWeight: 'bold',
    //           fontSize: 18,
    //         }}>
    //         My App
    //       </Text>
    //       <Text
    //         style={{
    //           color: 'yellow',
    //         }}>
    //         Sign in to continute
    //       </Text> */}
    //     </ImageBackground>
    //   </View>
    //   <View style={styles.footer}>
    //     <Inputs
    //       name="Email"
    //       icon="user"
    //       changeText={text => setisLogin({...isLogin, username: text})}
    //       giatri={isLogin.username}
    //     />

    //     <Text></Text>
    //     <Inputs
    //       giatri={isLogin.password}
    //       changeText={text => setisLogin({...isLogin, password: text})}
    //       name="Password"
    //       icon="lock"
    //       pass={isScurityEntry}
    //       autoFocus={true}></Inputs>
    //     <Text style={styles.errorTextStyle}>hellofdsdfs </Text>
    //     <TouchableOpacity
    //       style={styles.btnEye}
    //       onPress={() => {
    //         // setisIcon(!isIcon), setisScurityEntry(!isScurityEntry);
    //         setisIcon(!isIcon), setisScurityEntry(!isScurityEntry);
    //       }}>
    //       <Icon
    //         name={isIcon ? 'eye' : 'eye-slash'}
    //         size={25}
    //         color="grey"></Icon>
    //     </TouchableOpacity>

    //     <TouchableOpacity style={styles.loginBtn} onPress={loginExample}>
    //       <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 18}}>
    //         LOGIN
    //       </Text>
    //     </TouchableOpacity>

    //     <View
    //       style={{
    //         flexDirection: 'row',
    //         alignItems: 'flex-end',
    //         justifyContent: 'center',
    //         marginBottom: 20,
    //       }}>
    //       <Text style={{color: COLORS.light, fontWeight: 'bold'}}>
    //         Don`t have an account ?
    //       </Text>
    //       <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
    //         <Text style={{color: COLORS.pink, fontWeight: 'bold'}}>
    //           Sign up
    //         </Text>
    //       </TouchableOpacity>
    //     </View>
    //   </View>
    // </View>
    <SafeAreaView
      style={{paddingHorizontal: 20, flex: 1, backgroundColor: 'while'}}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{flexDirection: 'row', marginTop: 30}}>
          <Text style={{fontWeight: 'bold', fontSize: 22, color: COLORS.dark}}>
            My
          </Text>
          <Text
            style={{fontWeight: 'bold', fontSize: 22, color: COLORS.secondary}}>
            App
          </Text>
        </View>
        <View style={{marginTop: 60}}>
          <Text style={{fontSize: 27, fontWeight: 'bold', color: COLORS.dark}}>
            Welcome Back,
          </Text>
          <Text style={{fontSize: 19, fontWeight: 'bold', color: COLORS.light}}>
            Sign up to continue
          </Text>
        </View>
        <View style={{marginTop: 20}}>
          <View style={style.inputContainer}>
            <Inputs
              giatri={isLogin.username}
              name="Username"
              icon="user"
              changeText={text => setisLogin({...isLogin, username: text})}
              pass={false}
              // changeText={text => setissignin({...issignin, username: text})}
              // giatri={issignin.username}
            />
          </View>
          <View style={style.inputContainer}>
            <Inputs
              pass={isScurityEntry}
              giatri={isLogin.password}
              name="Password"
              icon="lock"
              changeText={text => setisLogin({...isLogin, password: text})}

              // changeText={text => setissignin({...issignin, username: text})}
              // giatri={issignin.username}
            />
          </View>
          <TouchableOpacity
            style={styles.btnEye}
            onPress={() => {
              // setisIcon(!isIcon), setisScurityEntry(!isScurityEntry);
              setisIcon(!isIcon), setisScurityEntry(!isScurityEntry);
            }}>
            <Icon
              name={isIcon ? 'eye' : 'eye-slash'}
              size={25}
              color="grey"></Icon>
          </TouchableOpacity>
          {error != '' ? (
            <Text style={styles.errorTextStyle}> {error} </Text>
          ) : null}
          <TouchableOpacity
            style={styles.loginBtn}
            // onPress={() => navigation.push('drawerscreen')}>
            onPress={() => loginExample()}>
            <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 18}}>
              Sign In
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
    backgroundColor: '#e6cae1',
  },

  header: {
    flex: 1,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  footer: {
    flex: 2,
    padding: 20,
  },
  imageBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  action: {
    flexDirection: 'row',
    borderBottomWidth: 2,
    borderBottomColor: '#f2f2f2',
  },
  textInput: {
    flex: 1,
    marginTop: 5,
    paddingBottom: 5,
    color: 'gray',
  },
  button_container: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  loginText: {
    color: '#403535',

    fontSize: 18,
  },
  signUp: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  loginBtn: {
    width: '100%',
    backgroundColor: '#5592d9',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  btnEye: {
    position: 'absolute',

    left: '90%',
    top: '55%',
  },
  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
  },
  inputContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default login2;
