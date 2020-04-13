
const socketioJwt = require('socketio-jwt')
const currentUsers = new Set([])
const infoCurrentUsers = {}
const totalConnectionsByUser = {}

const prepareUserInfo = (currentUsers) => {
  return Array.from(currentUsers)
    .map(email => infoCurrentUsers[email])
}

module.exports = (io, config) => {
  io.use(socketioJwt.authorize({
    secret: config.passportSecret,
    handshake: true
  }))

  io.on('connection', (socket) => {
    let addedUser = false
    console.log('new connect:', socket.decoded_token)

    socket.on('newUser', user => {
      if (addedUser) return
      addedUser = true

      socket.email = socket.decoded_token.email
      currentUsers.add(socket.email)

      infoCurrentUsers[socket.email] = {
        username: user.username
      }

      if (!totalConnectionsByUser[socket.email]) {
        totalConnectionsByUser[socket.email] = 0
      }
      totalConnectionsByUser[socket.email]++

      console.log(totalConnectionsByUser)
      console.log({ currentUsers })
      console.log(infoCurrentUsers)

      const allUsers = prepareUserInfo(currentUsers)

      console.log('allUsers: ', allUsers)

      io.emit('newUser', {
        user: user,
        allUsers: allUsers
      })
    })

    socket.on('newMessage', msg => {
      io.emit('newMessage', msg)
    })

    socket.on('disconnect', () => {
      if (addedUser) {
        const email = socket.email
        const leftUser = infoCurrentUsers[email]
        totalConnectionsByUser[email]--
        if (totalConnectionsByUser[email] === 0) {
          currentUsers.delete(email)
          delete infoCurrentUsers[email]
        }

        console.log(email)
        console.log(totalConnectionsByUser)

        const allUsers = prepareUserInfo(currentUsers)
        io.emit('leftUser', {
          user: leftUser,
          allUsers: allUsers
        })
      }
    })
  })
}
