import React, {Component} from 'react';
import {View, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

import {Input, Button} from 'react-native-elements';
import {useState, useEffect} from 'react';

// class Inputs extends Component {
//   state = {isFocused: false};

//   onFocusChange = () => {
//     this.setState({isFocused: true});
//   };

//   render() {
//     return (
//       <View
//         style={[
//           styles.container,
//           {borderColor: this.state.isFocused ? '#403535' : '#d1baba'},
//         ]}>
//         <Input
//           value={this.Value}
//           onChangeText={this.props.ChangeText}
//           placeholder={this.props.name}
//           onFocus={this.onFocusChange}
//           inputContainerStyle={styles.inputContainer}
//           inputStyle={styles.inputText}
//           secureTextEntry={this.props.password}
//           leftIcon={
//             <Icon
//               name={this.props.icon}
//               size={22}
//               color={this.state.isFocused ? '#403535' : '#d1baba'}
//             />
//           }
//         />
//         {/* <TouchableOpacity style={styles.btnEye}>
//           <Icon name="eye" size={25} color="grey"></Icon>
//         </TouchableOpacity> */}
//       </View>
//     );
//   }
// }

const Inputs = props => {
  // state = {isFocused: false};

  // onFocusChange = () => {
  //   this.setState({isFocused: true});
  // };
  const [iscolor, setiscolor] = useState(true);
  const onFocusChange = () => {
    setiscolor(false);
  };
  return (
    <View
      style={[
        styles.container,
        {borderColor: iscolor ? '#827d81' : '#141114'},
      ]}>
      <Input
        autoFocus={props.banphim}
        onChangeText={props.changeText}
        value={props.giatri}
        placeholder={props.name}
        onFocus={onFocusChange}
        inputContainerStyle={styles.inputContainer}
        inputStyle={styles.inputText}
        secureTextEntry={props.pass}
        leftIcon={
          <Icon
            name={props.icon}
            size={22}
            color={iscolor ? '#827d81' : '#141114'}
          />
        }
      />
      {/* <TouchableOpacity style={styles.btnEye}>
        <Icon name="eye" size={25} color="grey"></Icon>
      </TouchableOpacity> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 50,
    borderRadius: 100,
    marginVertical: 10,
    borderWidth: 3.5,
  },
  inputContainer: {
    borderBottomWidth: 0,
  },
  inputText: {
    color: 'black',
    fontWeight: 'bold',
    marginLeft: 5,
  },
  btnEye: {
    position: 'absolute',
    right: 2,
    top: 3,
  },
});

export default Inputs;
