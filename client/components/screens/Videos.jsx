import React from 'react'
import { Layout, Text, Avatar } from 'react-native-ui-kitten'
// import FeedNavigator from '../navigation/TopNavigator.jsx'

export default class Videos extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <React.Fragment>
        {/* <FeedNavigator /> */}
        <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text> This is the Video Feed </Text>
        </Layout>
      </React.Fragment>

    );
  }

}