const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const mongoose = require('mongoose')
const cors = require('cors')
const io = require('socket.io')()
const env = process.env.NODE_ENV || 'development'
const config = require('./config/db-' + env)
const User = require('./models/User')
const Message = require('./models/Message')

const app = express()

const connection = mongoose.connection
connection.once('open', () => {
  console.log('Successfully connected to DB!')
})

connection.on('err', console.error.bind(console, 'DB connection error!'))
mongoose.connect(config.db, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

mongoose.set('useCreateIndex', true)

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use(cors())

require('./config/passport-strategies')(User, config)
require('./routes/auth')(app, User, config, '/api')
require('./routes/message')(app, io, Message, User, config, '/api/message')

app.io = io
require('./sockets/io')(io, config)

module.exports = app
