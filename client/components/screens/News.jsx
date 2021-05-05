import React, { useCallback } from 'react'
import { StyleSheet, View, Image, TouchableOpacity, Linking, Alert } from 'react-native'
import { ApplicationProvider, IconRegistry, Layout, Text, Avatar, withStyles, List } from 'react-native-ui-kitten'
import axios from 'axios'
import { GNEWS_API_KEY, UNSPLASH_ACCESS_KEY, UNSPLASH_SECRET_KEY } from '../../../config.js'
import Unsplash, { toJson } from 'unsplash-js'
import { Promise } from 'bluebird'
import Icon from 'react-native-vector-icons/Entypo'

const unsplash = new Unsplash({
  accessKey: UNSPLASH_ACCESS_KEY
});

const data = [
  {
    "title": "Arab Israeli tahini company faces boycott after LGBT donation",
    "description": "The donation from the owner of the Al Arz tahini company was directed to help set up a hotline for Arabic-speaking LGBT Israelis.",
    "url": "https://forward.com/fast-forward/451003/arab-israeli-tahini-company-that-donated-money-to-lgbt-rights-group-faces/",
    "image": "https://images.gnews.io/9c5b2dcc02c576654ebff2b9ce2a964b",
    "publishedAt": "2020-07-20 07:50:00 UTC",
    "source": {
      "name": "The Forward",
      "url": "https://forward.com"
    }
  },
  {
    "title": "‘LGBT-free’ Polish village risks losing access to EU funds",
    "description": "Surrounded by fields of roses and lavender in tranquil eastern Poland, some residents of the village of Konskowola feel the EU might be trying to blackmail them. Like about 100 other municipalities ...",
    "url": "https://www.taipeitimes.com/News/editorials/archives/2020/07/20/2003740218",
    "image": "https://images.unsplash.com/photo-1516646085441-e1719f13aa3e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2532&q=80",
    "publishedAt": "2020-07-19 09:14:00 UTC",
    "source": {
      "name": "The Taipei Times",
      "url": "https://www.taipeitimes.com"
    }
  },
  {
    "title": "Arab tahini company that donated money to LGBT rights group faces boycott",
    "description": "Al Arz tahini is distributed globally, with its adherents including the popular Israeli chef Yotam Ottolenghi.",
    "url": "https://www.jpost.com/arab-israeli-conflict/arab-tahini-company-that-donated-money-to-lgbt-rights-group-faces-boycott-635471",
    "image": "https://images.unsplash.com/photo-1564694457547-6ea79902e0be?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2500&q=80",
    "publishedAt": "2020-07-18 09:48:00 UTC",
    "source": {
      "name": "The Jerusalem Post Blogs",
      "url": "https://www.jpost.com"
    }
  },
  {
    "title": "DOJ Must Lead Effort To Upend Anti-LGBT Rules, Groups Say",
    "description": "Civil rights groups led by the American Civil Liberties Union are pressing Attorney General William Barr to start enforcing the U.S. Supreme Court's ruling that federal anti-discrimination law covers ...",
    "url": "https://www.law360.com/articles/1293186/doj-must-lead-effort-to-upend-anti-lgbt-rules-groups-say",
    "image": "https://images.unsplash.com/photo-1562592619-908ca07deace?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2550&q=80",
    "publishedAt": "2020-07-17 21:48:00 UTC",
    "source": {
      "name": "Law360",
      "url": "https://www.law360.com"
    }
  },
  {
    "title": "Polish 'LGBT-Free' town weighs risk of losing EU funds",
    "description": "About a hundred towns across rural Poland have declared to be free of “LGBT ideology,” reflecting a backlash against gay rights throughout the nation.",
    "url": "https://www.nbcnews.com/feature/nbc-out/polish-lgbt-free-town-weighs-risk-losing-eu-funds-n1234197",
    "image": "https://images.gnews.io/32c405bce9797a3d2db427f8661f1303",
    "publishedAt": "2020-07-17 17:20:00 UTC",
    "source": {
      "name": "NBC News",
      "url": "https://www.nbcnews.com"
    }
  },
  {
    "title": "Washington state sues Trump administration over new LGBT health care rule",
    "description": "Washington state Attorney General Bob Ferguson on Friday sued the Trump administration for its recent rollback of health protections given to the LGBTQ community under the Affordable Care Act ...",
    "url": "https://thehill.com/homenews/administration/507837-washington-state-sues-trump-administration-over-new-lgbt-health-care",
    "image": "https://images.gnews.io/6d1d2c14d92afa03da11b232b3868843",
    "publishedAt": "2020-07-17 17:15:00 UTC",
    "source": {
      "name": "The Hill",
      "url": "https://thehill.com"
    }
  },
  {
    "title": "Pro-LGBT Catholic priest denounces critics of ‘gender ideology’ as unscientific",
    "description": "CHICAGO, July 17, 2020 (LifeSiteNews) — A Catholic priest has described the use of the term “gender ideology” as the “boogeyman” of those promoting “right-wing political and ecclesial agendas.” In a ...",
    "url": "https://www.lifesitenews.com/news/pro-lgbt-catholic-priest-denounces-critics-of-gender-ideology-as-unscientific",
    "image": "https://images.gnews.io/12e24fc6ba5381df2bd9fc66515e845d",
    "publishedAt": "2020-07-17 16:14:00 UTC",
    "source": {
      "name": "LifeSiteNews",
      "url": "https://www.lifesitenews.com"
    }
  },
  {
    "title": "Overnight Defense: Pentagon effectively bans Confederate flag | LGBT groups raise alarm that policy hits Pride flag, too | Trump reportedly eying South Korea troop drawdown",
    "description": "Happy Friday and welcome to Overnight Defense. I'm Rebecca Kheel, and here's your nightly guide to the latest developments at the Pentagon, on Capitol Hill and beyond. CLICK HERE to subscribe to the ...",
    "url": "https://www.msn.com/en-us/news/politics/overnight-defense-pentagon-effectively-bans-confederate-flag-lgbt-groups-raise-alarm-that-policy-hits-pride-flag-too-trump-reportedly-eying-south-korea-troop-drawdown/ar-BB16SwKw",
    "image": "https://images.gnews.io/60055c1ada6014eecbead6519d25210d",
    "publishedAt": "2020-07-17 14:30:36 UTC",
    "source": {
      "name": "The Hill on MSN.com",
      "url": "https://www.msn.com"
    }
  },
  {
    "title": "LGBT Pride Month: WO1 Domonique Silver speaks about the Don't Ask, Don't Tell Repeal Act of 2010",
    "description": "Add the following CSS to the header block of your HTML document. Then add the mark-up below to the body block of the same document. .videoWrapper { position: relative; padding-bottom: 56.25%; ...",
    "url": "https://www.dvidshub.net/video/760117/lgbt-pride-month-wo1-domonique-silver-speaks-about-dont-ask-dont-tell-repeal-act-2010",
    "image": "https://images.gnews.io/4ee477c22240ad99706f11538762a234",
    "publishedAt": "2020-07-17 11:05:00 UTC",
    "source": {
      "name": "DVIDSHub",
      "url": "https://www.dvidshub.net"
    }
  },
  {
    "title": "Polish 'LGBT-free' town weighs risk of losing EU funds",
    "description": "Surrounded by fields of roses and lavender in tranquil eastern Poland, some residents of the village of Konskowola feel the European Union may be trying to blackmail them.",
    "url": "https://www.reuters.com/article/us-poland-eu-lgbt/polish-lgbt-free-town-weighs-risk-of-losing-eu-funds-idUSKCN24I2BJ",
    "image": "https://images.gnews.io/578d09aec1f3125ff29d657ebc757b10",
    "publishedAt": "2020-07-17 10:16:00 UTC",
    "source": {
      "name": "Reuters",
      "url": "https://www.reuters.com"
    }
  }
]

class _News extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      articles: []
    };
    this.getArticles = this.getArticles.bind(this)
    this.renderItem = this.renderItem.bind(this)
    this.getRandomPhoto = this.getRandomPhoto.bind(this)
  }

  componentDidMount() {
    this.getArticles()
  }

  getArticles() {
    let fetch = axios.get(`https://gnews.io/api/v3/search?q=lgbt|gay|lesbian|bisexual|trans|queer&token=${GNEWS_API_KEY}`)
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
    Promise.all([fetch])
      .then((values) => {
        this.setState({
          articles: values[0],
        })
      })
      .catch(err => console.log(err))
  }

  getRandomPhoto() {
    unsplash.photos.getRandomPhoto({ query: 'lgbt' })
      .then(toJson)
      .then(json => {
        return json.links.html
      })
  }

  handleClick(url) {
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        Alert.alert("Don't know how to open URI: " + url)
      }
    }, [url])
  }

  renderItem = ({ item }) => {
    return (
      <TouchableOpacity style={this.props.themedStyle.card}
        onPress={() => this.handleClick(item.url)}>
        {item.image ? (<Image
          source={{ uri: item.image }}
          style={this.props.themedStyle.cardImage} />)
          : (<Image
            source={{ uri: this.getRandomPhoto() }}
            style={this.props.themedStyle.cardImage} />)}
        <View style={this.props.themedStyle.cardHeader}>
          <Text category='s1' style={this.props.themedStyle.cardTitle}>{item.title}</Text>
        </View>
        <View style={this.props.themedStyle.cardSource}>
          <Text category='c2'>{item.source.name}</Text><Icon name={'dot-single'}/><Text category='c2'>{item.publishedAt}</Text>
        </View>
        <View style={this.props.themedStyle.cardContent}>
          <Text category='c1'>{item.description}</Text>
        </View>
      </TouchableOpacity>
    )
  }

  render() {
    return (
      <React.Fragment>
        {this.state.articles.length ? (<List style={this.props.themedStyle.container}
          contentContainerStyle={this.props.themedStyle.contentContainer}
          data={this.state.articles}
          renderItem={item => this.renderItem(item)} />)
          : (<Layout style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text> Newsfeed </Text>
          </Layout>)}
      </React.Fragment>
    )
  }

}

export const News = withStyles(_News, theme => ({
  container: {
    flex: 1,

  },
  contentContainer: {
    // alignItems: 'center',
    // justifyContent: 'center'
  },
  card: {
    backgroundColor: theme['color-basic-100'],
    marginBottom: 20,
    padding: 0,
    margin: 10,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: '90%',
    zIndex: -1,
    borderRadius: 20,
    shadowColor: '#d9d9d9',
    shadowOffset: {
      width: 5,
      height: 5
    },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 30
  },
  cardImage: {
    display: 'flex',
    width: '100%',
    height: 300,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  cardTitle: {
    color: theme['color-basic-1000'],
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 15
  },
  cardSource: {
    color: theme['color-basic-1000'],
    fontSize: '8px',
    fontStyle: 'italic',
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 5,
    flex: 1,
    flexDirection: 'row'
  },
  cardContent: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 15,
    paddingTop: 10,
  }
}))
