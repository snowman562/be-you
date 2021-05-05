const plaid = require('plaid')
const moment = require('moment')

const PLAID_CLIENT_ID = 'your client ID here'
const PLAID_SECRET = 'your secret key here'
const PLAID_PUBLIC_KEY = 'your public key here'
const PLAID_ENV = 'sandbox'

const ACCESS_TOKEN = null
const PUBLIC_TOKEN = null
const ITEM_ID = null

// Initialize the Plaid client
const client = new plaid.Client(
  clientID: process.env.PLAID_CLIENT_ID,
  secret: process.env.PLAID_SECRET,
  env: plaid.environments.sandbox,
)

const receivePublicToken = (req, res) => {
  // First, receive the public token and set it to a constiable
  let PUBLIC_TOKEN = req.body.public_token
  // Second, exchange the public token for an access token
  client.exchangePublicToken(PUBLIC_TOKEN, function(error, tokenResponse) {
    ACCESS_TOKEN = tokenResponse.access_token
    ITEM_ID = tokenResponse.item_id
    res.json({
      access_token: ACCESS_TOKEN,
      item_id: ITEM_ID
    })
    console.log('access token below')
    console.log(ACCESS_TOKEN)
  })
}

const getTransactions = (req, res) => {
  // Pull transactions for the last 30 days
  let startDate = moment()
    .subtract(30, 'days')
    .format('YYYY-MM-DD')
  let endDate = moment().format('YYYY-MM-DD')
  console.log('made it past constiables')
  client.getTransactions(
    ACCESS_TOKEN,
    startDate,
    endDate,
    {
      count: 250,
      offset: 0
    },
    function(error, transactionsResponse) {
      res.json({ transactions: transactionsResponse })
      // TRANSACTIONS LOGGED BELOW!
      // They will show up in the terminal that you are running nodemon in.
      console.log(transactionsResponse)
    }
  )
}

module.exports = {
  receivePublicToken,
  getTransactions
}