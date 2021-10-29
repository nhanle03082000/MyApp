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

const App = () => {
  const [loadingButtonCheckin, setloadingButtonCheckin] = useState(false);
  const [loadingButtonCheckOut, setloadingButtonCheckOut] = useState(false);
  const [icon, seticon] = useState();
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
                      systemVersion: systemVer,
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
      console.log('user add', user);
      const getday = new Date();
      const fulltime = getday.toISOString();
      const date = fulltime.slice(0, 10);
      const gettime = new Date();
      const time = gettime.toLocaleTimeString();
      const longitude = getInfor.location.longitude;
      const latitude = getInfor.location.latitude;
      const requestUrl = 'http://192.168.0.103:3000/user/information';
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
        userId: user,
      });
      if (response) {
        if (response.data.status) {
          console.log('#data insert check in:', response.data);
          if (status) {
            seticon(true);
            // 1 == true 0==false
            setloadingButtonCheckOut(false);

            setloadingButtonCheckin(false);
            setIsCheckIn(true);
            setIsCheckOut(true);
            Alert.alert('Thông báo', response.data.notification);
            console.log('@checkOut', response.data.status);
          } else {
            seticon(true);
            setloadingButtonCheckin(false);
            setloadingButtonCheckOut(false);

            setIsCheckIn(true);
            setIsCheckOut(false);
            Alert.alert('Thông báo', response.data.notification);

            console.log('@checkIn', response.data.status);
          }
        } else {
          Alert.alert('Thông báo', response.data.notification);
        }
      }
    } catch (error) {
      setloadingButtonCheckOut(true);
      seticon(false);
      setloadingButtonCheckin(true);
      console.log(error);
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
        console.log('user check in', user);
        const getTime = new Date();
        const fulltime = getTime.toISOString();
        const date = fulltime.slice(0, 10);
        const requestUrl = 'http://192.168.0.103:3000/user/checkin';
        const response = await axios.post(requestUrl, {
          userId: user,
          date: date,
        });
        if (response) {
          console.log('kết quả check in', response.data);
          if (response.data.mess === 'Success') {
            seticon(true);
            setIsCheckIn(true);
            setIsLoading(false);
          } else {
            seticon(false);
            setIsCheckIn(false);
            setIsLoading(false);
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
        console.log('user check out:', user);
        const getTime = new Date();
        const fulltime = getTime.toISOString();
        const date = fulltime.slice(0, 10);
        const requestUrl = 'http://192.168.0.103:3000/user/checkout';
        const response = await axios.post(requestUrl, {
          userId: user,
          date: date,
        });
        if (response) {
          console.log('kết quả check out', response.data);
          if (response.data.mess === 'Success') {
            seticon(true);
            console.log('hello');
            setIsCheckOut(true);
            setIsLoading(false);
          } else {
            seticon(false);
            console.log('sad');
            setIsCheckOut(false);
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
            colors: ['purple', '#b38b89'],
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
          title="Check In"
          titleStyle={styles.text}
          // iconPosition="top"
          onPress={() => checkIn()}
        />

        <Button
          ViewComponent={LinearGradient}
          linearGradientProps={{
            colors: ['purple', '#b38b89'],
            start: {x: 0, y: 0.5},
            end: {x: 1, y: 0.5},
          }}
          icon={
            icon
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
  text: {
    fontSize: 18,
  },
});

export default App;