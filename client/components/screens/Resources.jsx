import React from 'react'
import { Layout, Text, Avatar } from 'react-native-ui-kitten'
// import FeedNavigator from '../navigation/TopNavigator.jsx'

export default class Resources extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <React.Fragment>
        {/* <FeedNavigator /> */}
        <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text> Find various LGBTQ+ resources here </Text>
        </Layout>
      </React.Fragment>

    );
  }

}