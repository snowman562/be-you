import React, { Fragment, useState } from 'react'
import TabNavigator from './navigation/TabNavigator.jsx'
import HeaderNavigator from './navigation/HeaderNavigator.jsx'
import { mapping, light } from '@eva-design/eva'
import { Alert } from 'react-native'
import { ApplicationProvider, IconRegistry, Layout, Text, Avatar } from 'react-native-ui-kitten'
import { EvaIconsPack } from '@ui-kitten/eva-icons'
import { AppLoading } from 'expo'
import * as Font from 'expo-font'
import Login from './login/Login.jsx'
import axios from 'axios'
import firebaseConfig from '../../firebase'
import * as firebase from 'firebase'
import * as Facebook from 'expo-facebook'
import * as Google from 'expo-google-app-auth'
import * as Apple from 'expo-apple-authentication'

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

export default class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      fontsLoaded: false,
      loggedin: false,
      name: '',
      firstName: '',
      photoURL: '',
    }
    this.handleFacebookLogin = this.handleFacebookLogin.bind(this)
    this.handleGoogleLogin = this.handleGoogleLogin.bind(this)
    this.handleAppleLogin = this.handleAppleLogin.bind(this)
  }

  // const [isLoggedin, setLoggedinStatus] = useState(false);
  // const [userData, setUserData] = useState(null);
  // const [isImageLoading, setImageLoadStatus] = useState(false);

  componentDidMount() {
    this._loadFontsAsync()
    firebase.auth().onAuthStateChanged(user => {
      if (user !== null) {
        console.log(user)
      }
    })
  }

  async _loadFontsAsync() {
    await Font.loadAsync({ 'Billabong': require('../../assets/fonts/Billabong.ttf') })
    this.setState({ fontsLoaded: true })
  }

  async handleFacebookLogin() {
    try {
      await Facebook.initializeAsync({ appId: '3165489813558150', appName: 'Be You' })
      const { type, token, expires, permissions, declinedPermissions } = await Facebook.logInWithReadPermissionsAsync({
        permission: ['public_profile', 'email']
      })
      if (type === 'success') {
        fetch(`https://graph.facebook.com/me?fields=id,name,first_name,last_name,email,picture&access_token=${token}`)
          .then(response => response.json())
          .then(response => {
            this.setState({
              loggedin: true,
              name: response.name,
              firstName: response.first_name,
              photoURL: response.picture.data.url
            }, () => {
              Alert.alert(
                'Welcome to Be You!',
                `Welcome back, ${response.first_name}!`,
                [
                  { text: 'OK', onPress: () => console.log('OK Pressed') }
                ],
                { cancelable: false }
              )
            })
          })
          .catch(e => console.log(e))
      } else {
      console.log('FB Authentication Type = Cancel')
      }
    } catch({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  }

  async handleGoogleLogin() {
    try {
      const result = await Google.logInAsync({
        iosClientId: '1072710856472-r6adei6bpilb177gr4dbhki9b5tscmlo.apps.googleusercontent.com',
        scopes: ['profile', 'email']
      })
      if (result.type === 'success') {
        this.setState({
          loggedin: true,
          name: result.user.name,
          firstName: result.user.givenName,
          photoURL: result.user.photoUrl
        }, () => {
          Alert.alert(
            'Welcome to Be You!',
            `Welcome back, ${result.user.givenName}!`,
            [
              { text: 'OK', onPress: () => console.log('OK Pressed') }
            ],
            { cancelable: false }
          )
        })
      } else {
        console.log('Google Authentication Type = Cancel')
      }
    } catch (error) {
      console.log('Error:', error)
    }
  }

  async handleAppleLogin() {
    try {
      const result = await Apple.signInAsync({
          requestedScopes: [
            Apple.AppleAuthenticationScope.FULL_NAME,
            Apple.AppleAuthenticationScope.EMAIL,
          ]
        })
      this.setState({
        loggedin: true,
        name: result.fullName,
        firstName: result.fullName.givenName
      }, () => {
        Alert.alert(
          'Welcome to Be You!',
          `Welcome back, ${result.fullName.givenName}!`,
          [
            { text: 'OK', onPress: () => console.log('OK Pressed') }
          ],
          { cancelable: false }
        )
      })
    } catch (error) {
      console.log('Error:', error)
    }
  }


  render() {
    if (this.state.loggedin && this.state.fontsLoaded) {
      return (
        <Fragment>
          <IconRegistry icons={EvaIconsPack} />
          <ApplicationProvider mapping={mapping} theme={light} >
            <HeaderNavigator photoURL={this.state.photoURL} />
            <TabNavigator />
          </ApplicationProvider>
        </Fragment>
      )
    } else if (!this.state.loggedin && this.state.fontsLoaded) {
      return (
        <Fragment>
          <IconRegistry icons={EvaIconsPack} />
          <ApplicationProvider mapping={mapping} theme={light} >
            <Login handleFacebookLogin={this.handleFacebookLogin}
                    handleGoogleLogin={this.handleGoogleLogin}
                    handleAppleLogin={this.handleAppleLogin} />
          </ApplicationProvider>
        </Fragment>
      )
    } else {
      return <AppLoading />
    }

  }

}
