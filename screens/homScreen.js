/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect} from 'react';

import {
  ActivityIndicator,
  Alert,
  ScrollView,
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Button} from 'react-native-elements';
import DeviceInfo from 'react-native-device-info';
import GetLocation from 'react-native-get-location';
import NetInfo from '@react-native-community/netinfo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import RNRestart from 'react-native-restart';
const App = () => {
  const [loadingButtonCheckin, setloadingButtonCheckin] = useState(false);
  const [loadingButtonCheckOut, setloadingButtonCheckOut] = useState(false);
  const [icon, seticon] = useState();
  const [iconCheckouy, seticonCheckouy] = useState();
  const [isCheckIn, setIsCheckIn] = useState(null);
  const [isCheckOut, setIsCheckOut] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [getInfor, setgetInfor] = useState({
    uniqueId: '',
    ipAddress: '',
    macAddress: '',
    deviceName: '',
    brand: '',
    location: '',
    buildId: '',
    deviceType: '',
    systemversion: '',
    ssid: '',
    userId: '',
  });

  useEffect(() => {
    function getData() {
      DeviceInfo.getIpAddress().then(ipAddress => {
        DeviceInfo.getMacAddress().then(macAddress => {
          DeviceInfo.getDeviceName().then(deviceName => {
            NetInfo.fetch('wifi').then(getInfor => {
              DeviceInfo.getBuildId().then(buildId => {
                GetLocation.getCurrentPosition({
                  enableHighAccuracy: true,
                  timeout: 15000,
                })
                  .then(location => {
                    const uniId = DeviceInfo.getUniqueId();
                    const brnd = DeviceInfo.getBrand();
                    const deviceType = DeviceInfo.getDeviceType();
                    const systemVer = DeviceInfo.getSystemVersion();
                    const ssid = getInfor.details.ssid;
                    setgetInfor({
                      uniqueId: uniId,
                      ipAddress: ipAddress,
                      macAddress: macAddress,
                      deviceName: deviceName,
                      brand: brnd,
                      location: location,
                      buildId: buildId,
                      deviceType: deviceType,
                      systemversion: systemVer,
                      ssid: ssid,
                    });
                  })
                  .catch(e => {
                    console.log(e);
                  });
              });
            });
          });
        });
      });
    }

    getData();
  }, []);

  const addInformation = async status => {
    // const userId = id.
    try {
      const user = await AsyncStorage.getItem('userId');
      const dataJson = JSON.parse(user);

      console.log('user sfa.fdsasssid in', user);
      const getday = new Date();
      const fulltime = getday.toISOString();
      console.log('date', fulltime);

      const date = fulltime.slice(0, 10);
      const gettime = new Date();
      const time = gettime.toLocaleTimeString();
      const longitude = getInfor.location.longitude;
      // console.log('longitude', longitude);
      console.log(getInfor.brand);
      const latitude = getInfor.location.latitude;
      console.log('ssid', getInfor.ssid);
      console.log('userid', user);

      const requestUrl =
        'https://greenwich-attendance.herokuapp.com/information/create';
      const response = await axios.post(requestUrl, {
        uniqueId: getInfor.uniqueId,
        ipAddress: getInfor.ipAddress,
        macAddress: getInfor.macAddress,
        deviceName: getInfor.deviceName,
        brand: getInfor.brand,
        buildId: getInfor.buildId,
        deviceType: getInfor.deviceType,
        ssid: getInfor.ssid,
        status: status,
        systemversion: getInfor.systemversion,
        date: date,
        time: time,
        longitude: longitude,
        latitude: latitude,
        userId: dataJson._id,
      });
      console.log('test resp', response);
      if (response) {
        if (response.data.status) {
          console.log('#data insert check in:', response.data.data);
          if (status) {
            if (response.data.data.status === 0) {
              seticon(true);
              seticonCheckouy(false);
            } else {
              seticon(true);
              seticonCheckouy(true);
            }
            // 1 == true 0==false
            setloadingButtonCheckOut(false);
            setloadingButtonCheckin(false);
            setIsCheckIn(true);
            setIsCheckOut(true);
            // Alert.alert('Thông báo', response.data.notification);
            console.log('@checkOut', response.data.status);
          } else {
            seticon(true);
            setloadingButtonCheckin(false);
            setloadingButtonCheckOut(false);
            setIsCheckIn(true);
            setIsCheckOut(false);
            Alert.alert('Thông báo', response.data.notifica);

            console.log('@checkIn', response.data.status);
          }
        } else {
          Alert.alert(response.data.notifica);
          // Alert.alert('Thông báo', response.data.notifica);
        }
      }
    } catch (error) {
      Alert.alert(
        'Your connection is unstable. Please exit the app and try again.',
      );
      setloadingButtonCheckOut(true);
      seticon(false);
      setloadingButtonCheckin(true);
      console.log('error:', error);
      return false;
    }
  };
  const checkIn = () => {
    setloadingButtonCheckin(true);

    addInformation(0);
  };
  const checkOut = () => {
    setloadingButtonCheckOut(true);

    addInformation(1);
  };
  useEffect(() => {
    async function isCheckIn() {
      try {
        const user = await AsyncStorage.getItem('userId');
        const dataJson = JSON.parse(user);

        console.log('user sfa.ádfasdfasd in', user);
        const getTime = new Date();
        const fulltime = getTime.toISOString();
        const date = fulltime.slice(0, 10);
        const requestUrl =
          'https://greenwich-attendance.herokuapp.com/information/checkin';
        const response = await axios.post(requestUrl, {
          userId: dataJson._id,
          date: date,
        });
        if (response) {
          console.log('kết quả check in', response.data);
          if (response.data.mess === 'Success') {
            seticon(true);
            setIsCheckIn(true);
            setIsLoading(false);
            setIsCheckOut(false);
          } else {
            seticon(false);
            setIsCheckIn(false);
            setIsLoading(false);
            setIsCheckOut(true);
            setIsCheckOut(true);
          }
        }

        return true;
      } catch (error) {
        console.log(error);
        setIsLoading(false);
        return false;
      }
      return true;
    }
    isCheckIn();
  }, []);
  useEffect(() => {
    async function isCheckOut() {
      try {
        const user = await AsyncStorage.getItem('userId');
        const dataJson = JSON.parse(user);

        // console.log('check-in', dataJson._id);
        const getTime = new Date();
        const fulltime = getTime.toISOString();
        const date = fulltime.slice(0, 10);
        const requestUrl =
          'https://greenwich-attendance.herokuapp.com/information/checkout';
        const response = await axios.post(requestUrl, {
          userId: dataJson._id,
          date: date,
        });
        if (response) {
          console.log('kết quả check out', response.data);
          if (response.data.mess === 'Success') {
            seticonCheckouy(true);
            console.log('hello');
            setIsCheckOut(true);
            setIsLoading(false);
          } else {
            seticonCheckouy(false);
            // console.log('sad');
            // setIsCheckOut(false);
            //nhanle da test
            setIsLoading(false);
          }
        }
      } catch (error) {
        console.log(error);
        setIsLoading(false);
        return false;
      }
      return true;
    }
    isCheckOut();
  }, []);
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Button
          ViewComponent={LinearGradient}
          linearGradientProps={{
            colors: ['#88a2c2', '#b38b89'],
            start: {x: 0, y: 0.5},
            end: {x: 1, y: 0.5},
          }}
          // loadingProps={<ActivityIndicator color="red" size="small" />}
          // disabled={true}
          loading={loadingButtonCheckin}
          // TouchableComponent={}
          buttonStyle={styles.loginBtn}
          disabled={isCheckIn}
          icon={
            icon
              ? {
                  name: 'check-circle',
                  size: 25,
                  color: 'white',
                }
              : {name: null}
          }
          title="CHECK IN"
          titleStyle={styles.text}
          // iconPosition="top"
          onPress={() => checkIn()}
        />

        <Button
          ViewComponent={LinearGradient}
          linearGradientProps={{
            colors: ['#5d7373', '#b38b89'],
            start: {x: 0, y: 0.5},
            end: {x: 1, y: 0.5},
          }}
          icon={
            iconCheckouy
              ? {
                  name: 'check-circle',
                  size: 25,
                  color: 'white',
                }
              : {name: null}
          }
          // disabled={true}
          loading={loadingButtonCheckOut}
          // TouchableComponent={}
          buttonStyle={styles.loginBtn}
          // icon={{
          //   name: 'check-circle',
          //   size: 25,
          //   color: 'white',
          // }}
          disabled={isCheckOut}
          title="CHECK OUT "
          titleStyle={styles.text}
          // iconPosition="top"
          onPress={() => checkOut()}
        />
        <Button
          ViewComponent={LinearGradient}
          linearGradientProps={{
            colors: ['#5d7373', '#b38b89'],
            start: {x: 0, y: 0.5},
            end: {x: 1, y: 0.5},
          }}
          // icon={
          //   iconCheckouy
          //     ? {
          //         name: 'check-circle',
          //         size: 25,
          //         color: 'white',
          //       }
          //     : {name: null}
          // }
          // disabled={true}
          // loading={loadingButtonCheckOut}
          // TouchableComponent={}
          buttonStyle={styles.loginBtn1}
          // icon={{
          //   name: 'check-circle',
          //   size: 25,
          //   color: 'white',
          // }}
          // disabled={isCheckOut}
          title="Resfesh "
          titleStyle={styles.text}
          // iconPosition="top"
          onPress={() => RNRestart.Restart()}
        />
      </View>

      {/* <ScrollView style={{flex: 1}}>
        <TextBox label="Tên:" content={getInfor.deviceName} />
        <TextBox label="ID Thiết Bị" content={getInfor.uniqueId} />
        <TextBox label="Địa Chỉ Mac:" content={getInfor.macAddress} />
        <TextBox label="Địa Chỉ IP:" content={getInfor.ipAddress} />
        <TextBox label="Brand:" content={getInfor.brand} />

        <TextBox label="buildId:" content={getInfor.buildId} />
        <TextBox label="SSID:" content={getInfor.ssid} />
        <TextBox label="deviceType:" content={getInfor.deviceType} />
        <TextBox label="systemVersion:" content={getInfor.systemVersion} />

        <Text></Text>
        <TextBox label="Vị Trí:" content={JSON.stringify(getInfor.location)} />

        <Text></Text>
      </ScrollView> */}
    </SafeAreaView>
  );
};
var styles = StyleSheet.create({
  container: {
    top: '80%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginBtn: {
    width: '100%',
    backgroundColor: '#93278f',
    borderRadius: 25,
    height: 50,
    width: 300,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    marginTop: 20,
  },
  loginBtn1: {
    width: '100%',
    backgroundColor: '#93278f',
    borderRadius: 25,
    height: 50,
    width: 300,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    marginTop: 20,
  },
  text: {
    fontSize: 18,
    color: 'black',
  },
});

export default App;
