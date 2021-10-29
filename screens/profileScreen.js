// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  ActivityIndicator,
  SafeAreaView,
  Alert,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
const BG_IMG = 'https://wallpaperaccess.com/full/1205291.png';

const profileScreen = () => {
  const [id, setid] = useState('');
  const [history, setHistory] = useState({
    titles: [],
    data: {},
  });
  const [isLoading, setIsLoading] = useState(true);
  const loginExample = () => {
    const getTime = new Date();
    const fulltime = getTime.toISOString();
    const date = fulltime.slice(0, 7);
    fetch('http://192.168.0.103:3000/user/getTime', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        date: date,
        userId: id,
      }),
    })
      .then(res => res.json())
      .then(res => {
        const result = res.data;
        console.log(result);
        const lsHisTitle = [];
        Object.keys(res.data).forEach(key => {
          lsHisTitle.push(key);
        });

        console.log('titles:', lsHisTitle, 'data:', res.data);
        console.log('titles:', lsHisTitle, 'data:', res.data);
        setIsLoading(false);
        setHistory({data: res.data, titles: lsHisTitle});
      });
  };
  useEffect(() => {
    AsyncStorage.getItem('userId').then(value => {
      setid(value);
    });
    loginExample();
  }, []);
  const renderItem = ({item}) => {
    const title = item;
    const data = history.data[title];
    const dataVao = data[0];
    const dataRa = data[1];
    if (dataVao && dataRa) {
      return (
        <View style={styles.item}>
          <View style={styles.wrapText}>
            <Text style={styles.fontSize}>Day: {title}</Text>
          </View>
          <View style={styles.wrapText}>
            <Text style={styles.fontSize}> Start at: {dataVao.time}</Text>
          </View>
          <View style={styles.wrapText}>
            <Text style={styles.fontSize}> Finish at: {dataRa.time}</Text>
          </View>
        </View>
      );
    } else {
      if (dataVao && !dataRa) {
        return (
          <View style={styles.item}>
            <View style={styles.wrapText}>
              <Text style={styles.fontSize}>Day: {title}</Text>
            </View>
            <View style={styles.wrapText}>
              <Text style={styles.fontSize}> Start at: {dataVao.time}</Text>
            </View>
          </View>
        );
      } else {
        return (
          <View style={styles.item}>
            <View style={styles.wrapText}>
              <Text style={styles.fontSize}>Day: {title}</Text>
            </View>
            <View style={styles.wrapText}>
              <Text style={styles.fontSize}> Finish at: {dataRa.time}</Text>
            </View>
          </View>
        );
      }
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={{uri: BG_IMG}}
        style={StyleSheet.absoluteFillObject}
        blurRadius={70}
      />
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={history.titles}
          renderItem={renderItem}
          keyExtractor={(item, index) => item.time + '.' + index}
        />
      )}
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fontSize: {
    fontSize: 20,
  },
  wrapText: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    marginTop: 40,
    borderRadius: 100,
    backgroundColor: '#d2d4cb',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    padding: 5,
  },
});
export default profileScreen;
