const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const Controller = require('./controller.js')
const cors = require('cors')

const app = express()
const PORT = 3000
const {
  receivePublicToken,
  getTransactions
  } = require('./controller')

// MIDDLEWARE
app.use(cors())
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// ROUTES

// Get the public token and exchange it for an access token
app.post("/auth/public_token", receivePublicToken)

// Get Transactions
app.get("/transactions", getTransactions)


// LISTEN
app.listen(PORT, console.log(`Be You listening on port ${PORT}`))