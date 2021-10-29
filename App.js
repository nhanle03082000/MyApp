// // Example of Splash, Login and Sign Up in React Native
// // https://aboutreact.com/react-native-login-and-signup/
// import 'react-native-gesture-handler';

// // Import React and Component
// import React from 'react';

// // Import Navigators from React Navigation
// import {NavigationContainer} from '@react-navigation/native';
// import {createStackNavigator} from '@react-navigation/stack';

// // Import Screens
// import SplashScreen from './Screen/SplashScreen';
// import LoginScreen from './Screen/LoginScreen';
// import RegisterScreen from './Screen/RegisterScreen';
// import DrawerNavigationRoutes from './Screen/DrawerNavigationRoutes';

// const Stack = createStackNavigator();

// const Auth = () => {
//   // Stack Navigator for Login and Sign up Screen
//   return (
//     <Stack.Navigator initialRouteName="LoginScreen">
//       <Stack.Screen
//         name="LoginScreen"
//         component={LoginScreen}
//         options={{headerShown: false}}
//       />
//       <Stack.Screen
//         name="RegisterScreen"
//         component={RegisterScreen}
//         options={{
//           title: 'Register', //Set Header Title
//           headerStyle: {
//             backgroundColor: '#307ecc', //Set Header color
//           },
//           headerTintColor: '#fff', //Set Header text color
//           headerTitleStyle: {
//             fontWeight: 'bold', //Set Header text style
//           },
//         }}
//       />
//     </Stack.Navigator>
//   );
// };

// /* Switch Navigator for those screens which needs to be switched only once
//   and we don't want to switch back once we switch from them to the next one */
// const App = () => {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName="SplashScreen">
//         {/* SplashScreen which will come once for 5 Seconds */}
//         <Stack.Screen
//           name="SplashScreen"
//           component={SplashScreen}
//           // Hiding header for Splash Screen
//           options={{headerShown: false}}
//         />
//         {/* Auth Navigator which includer Login Signup will come once */}
//         <Stack.Screen
//           name="Auth"
//           component={Auth}
//           options={{headerShown: false}}
//         />
//         {/* Navigation Drawer as a landing page */}
//         <Stack.Screen
//           name="DrawerNavigationRoutes"
//           component={DrawerNavigationRoutes}
//           // Hiding header for Navigation Drawer as we will use our custom header
//           options={{headerShown: false}}
//         />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// };

// export default App;

import {createStackNavigator} from '@react-navigation/stack';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {StyleSheet} from 'react-native';
import login2 from './screens/login2';

import signup from './screens/signup';
import splashScreen from './screens/splashScreen';
import DrawerScreen from './screens/DrawerScreen';
const Stack = createStackNavigator();

const stackScreen = () => {
  return (
    <Stack.Navigator initialRouteName="screenLogin">
      <Stack.Screen
        options={{headerShown: false}}
        name="login"
        component={login2}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="SignUp"
        component={signup}
      />
    </Stack.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen
          name="splash"
          component={splashScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="loginandsignup"
          component={stackScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="drawerscreen"
          component={DrawerScreen}
          options={{headerShown: false}}
        />
        {/* <Stack.Screen name="DrawerScreen" component={DrawerScreen} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
// const App = () => {
//   return (
//     <NavigationContainer>
//       <Drawer.Navigator>
//         <Drawer.Screen name="screen1" component={login2} />
//         <Drawer.Screen name="screen2" component={test2} />
//       </Drawer.Navigator>
//     </NavigationContainer>
//   );
// };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
