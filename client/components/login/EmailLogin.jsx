import React from 'react'
import { StyleSheet, View, TextInput, Image, TouchableOpacity, ImageBackground } from 'react-native'
import { ApplicationProvider, IconRegistry, Layout, Text, Avatar, withStyles, List } from 'react-native-ui-kitten'
import { EvaIconsPack } from '@ui-kitten/eva-icons'
import { AppLoading } from 'expo'

const backgroundImage = require('../../../assets/RainbowHeart.jpg')

export default class EmailLogin extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      fontsLoaded: false,
    }
  }

  componentDidMount() {

  }

  render() {
      return (
        <View style={styles.container}>
          <ImageBackground source={backgroundImage} style={styles.image}>
            <View style={styles.container}>
              <Text style={styles.logo}>Be You</Text>
              <View style={styles.inputView} >
                <TextInput
                  style={styles.inputText}
                  placeholder='Email'
                  placeholderTextColor='#003f5c'
                  onChangeText={text => this.setState({ email: text })} />
              </View>
              <View style={styles.inputView} >
                <TextInput
                  style={styles.inputText}
                  placeholder='Password'
                  placeholderTextColor='#003f5c'
                  secureTextEntry={true}
                  onChangeText={text => this.setState({ password: text })} />
              </View>
              <TouchableOpacity>
                <Text style={styles.forgot}>Forgot Password?</Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </View>
      )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    width: '100%',
    height: '100%'
  },
  logo: {
    fontFamily: 'Billabong',
    fontSize: 60,
    color: '#fff',
    padding: 60,
    marginTop: 80,
    marginBottom: 20,
    justifyContent: 'flex-start'
  },
  buttons: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '100%'
  },
  inputView: {
    width: '80%',
    backgroundColor: '#F0F8FF',
    opacity: 0.75,
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: 'center',
    padding: 20
  },
  inputText: {
    height: 50
  },
  forgot: {
    color: '#000000',
    fontSize: 11
  },
  loginBtn: {
    width: '80%',
    backgroundColor: '#fb5b5a',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
    marginBottom: 10
  },
  facebook: {
    width: '80%',
    backgroundColor: '#4267B2',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 5
  },
  google: {
    width: '80%',
    backgroundColor: '#de5246',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 5
  },
  apple: {
    width: '80%',
    backgroundColor: '#000000',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 10
  },
  loginText: {
    color: '#fff'
  },
  signupText: {
    color: '#000000'
  }
})