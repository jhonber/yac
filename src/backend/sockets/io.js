
const socketioJwt = require('socketio-jwt')

module.exports = (io, config) => {
  io.use(socketioJwt.authorize({
    secret: config.passportSecret,
    handshake: true
  }))

  io.on('connection', (socket) => {
    console.log('new connect: ', socket.decoded_token)
    socket.on('newUser', user => {
      console.log('[nuewUser]: ', user)
      io.emit('newUser', user)
    })

    socket.on('newMessage', msg => {
      io.emit('newMessage', msg)
    })
  })
}
