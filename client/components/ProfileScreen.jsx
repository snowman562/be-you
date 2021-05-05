import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class ProfileScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return(
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text> This is your profile </Text>
      </View>
    );
  }

}