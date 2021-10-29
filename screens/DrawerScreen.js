// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React
import React from 'react';

// Import Navigators from React Navigation
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// Import Screens
import profileScreen from './profileScreen';
import homScreen from './homScreen';
import customMenu from '../components/customMenu';
import DrawerHeader from '../components/DrawerHeader';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const homScreenStack = ({navigation}) => {
  return (
    <Stack.Navigator initialRouteName="HomeScreen">
      <Stack.Screen
        name="HomeScreen"
        component={homScreen}
        options={{
          title: 'Home', //Set Header Title
          headerLeft: () => <DrawerHeader navigationProps={navigation} />,
          headerStyle: {
            backgroundColor: '#93278f', //Set Header color
          },
          headerTintColor: '#fff', //Set Header text color
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
          },
        }}
      />
    </Stack.Navigator>
  );
};

const profileScreenStack = ({navigation}) => {
  return (
    <Stack.Navigator
      initialRouteName="SettingsScreen"
      screenOptions={{
        headerLeft: () => <DrawerHeader navigationProps={navigation} />,
        headerStyle: {
          backgroundColor: '#93278f', //Set Header color
        },
        headerTintColor: '#fff', //Set Header text color
        headerTitleStyle: {
          fontWeight: 'bold', //Set Header text style
        },
      }}>
      <Stack.Screen
        name="SettingsScreen"
        component={profileScreen}
        options={{
          title: 'Profile', //Set Header Title
        }}
      />
    </Stack.Navigator>
  );
};

const DrawerScreen = props => {
  return (
    <Drawer.Navigator
      screenOptions={{
        // activeTintColor: '#cee1f2',
        // color: '#cee1f2',
        // itemStyle: {marginVertical: 5, color: 'white'},
        // labelStyle: {
        //   color: '#d8d8d8',
        // },
        headerShown: false,
        drawerActiveTintColor: 'black',
        drawerActiveBackgroundColor: '#756c75',
        // drawerLabelStyle: {
        //   color: 'green',
        // },
      }}
      drawerContent={customMenu}>
      <Drawer.Screen
        name="homeScreenStack"
        options={{
          drawerLabel: 'Home',
          drawerIcon: ({color, size}) => (
            <Icon name="home-outline" size={size} color={color} />
          ),
        }}
        component={homScreenStack}
      />
      <Drawer.Screen
        name="settingScreenStack"
        options={{
          drawerLabel: 'Profile',
          drawerIcon: ({color, size}) => (
            <Icon name="account-outline" size={size} color={color} />
          ),
        }}
        component={profileScreenStack}
      />
    </Drawer.Navigator>
  );
};

export default DrawerScreen;
