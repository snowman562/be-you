import React from 'react'
import axios from 'axios'
import { Layout, Text, Avatar } from 'react-native-ui-kitten'
import { EVENTBRITE_API_KEY } from '../../../config.js'

export default class Events extends React.Component {

  constructor(props) {
    super(props)
    this.state = {}
    this.getEvents = this.getEvents.bind(this)
  }

  componentDidMount() {
    this.getEvents()
  }

  getEvents() {
    axios.get(`https://www.eventbriteapi.com/v3/users/me/?token=${EVENTBRITE_API_KEY}`)
      .then(response => {
        let articles = response.data.articles
        articles.forEach(article => {
          if (!article.image) {
            unsplash.photos.getRandomPhoto({ query: 'lgbt', featured: true, orientation: 'squarish' })
              .then(toJson)
              .then(json => {
                article.image = json.urls.full
              })
          }
        })
        return articles
      })
      .catch(err => console.log(err))
  }

  render() {
    return (
      <React.Fragment>
        <Layout style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text> Find local LGBTQ+ events here </Text>
        </Layout>
      </React.Fragment>
    );
  }

}