
// DEKLARE LIBRARY

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const helmet = require('helmet')
const xss = require('xss-clean')
const socket = require('socket.io')
const socketController = require('./src/socket/index')
// BUAT ROUTE
const userRouter = require('./src/router/user.routes')

const http = require('http')
require('dotenv').config()

const app = express()
app.use(express.static('public'))
app.use(express.static('public/photo_perekrut'))
app.use(express.static('photofoods'))
app.use(helmet())
app.use(bodyParser.json())
app.use(xss())
app.use(cors())
app.get('/ping', (req, res) => {
  res.json({
    message: 'PONG'
  })
})
app.use(userRouter)

const server = http.createServer(app)

const io = socket(server, {
  cors: {
    origin: '*'
  }
})

io.on('connection', (socket) => {
  console.log('new user connect')
  socketController(io, socket)
})

// jalankan express
const APP_PORT = process.env.PORT || 3005

server.listen(APP_PORT, () => {
  console.log('listening on port' + APP_PORT)
})
