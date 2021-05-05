import React from 'react'
import { StyleSheet, Image, TouchableOpacity } from 'react-native'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { NavigationContainer } from '@react-navigation/native';
import { Icon, Layout, MenuItem, OverflowMenu, TopNavigation, TopNavigationAction } from 'react-native-ui-kitten'
import { Header } from 'react-native-elements'
import { AppLoading } from 'expo'
import * as Font from 'expo-font'

export default class HeaderNav extends React.Component {

  constructor(props) {
    super(props)
    this.state = {}
  }


  render() {

    return (
      <React.Fragment>
          <Header
            statusBarProps={{ barStyle: 'light-content' }}
            barStyle="light-content"
            centerComponent={{ text: 'Be You', style: { fontSize: 40, paddingBottom: 50, fontFamily: 'Billabong' } }}
            rightComponent={() => (<TouchableOpacity style={styles.pictureBtn}
                                                    onPress={() => console.log('Settings!', this.props.photoURL)}>
                                    {this.props.photoURL.length ? (<Image source={{uri: this.props.photoURL}}
                                                                          style={styles.profilePicture} />)
                                                                : (<Icon name='person-outline'
                                                                          height={32}
                                                                          width={32}
                                                                          fill={'#111'} />)}
                                  </TouchableOpacity>)}
            containerStyle={{
              backgroundColor: 'white',
              justifyContent: 'space-around',
            }}
          />
        </React.Fragment>
    )

  }
}

const styles = StyleSheet.create({
  profilePicture: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  pictureBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
  },
})