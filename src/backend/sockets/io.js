
const socketioJwt = require('socketio-jwt')
const currentUsers = new Set([])
const infoCurrentUsers = {}
const totalConnectionsByUser = {}
const colors = [
  '#A52A2A', '#8A2BE2', '#8B008B',
  '#D2691E', '#5F9EA0', '#6495ED',
  '#000000', '#B8860B', '#006400',
  '#FF8C00', '#2F4F4F', '#B22222',
  '#FF1493', '#9370DB'
]
let curColor = 0

const prepareUserInfo = (currentUsers) => {
  return Array.from(currentUsers)
    .map(email => infoCurrentUsers[email])
}

module.exports = (io, config, assignedColor) => {
  io.use(socketioJwt.authorize({
    secret: config.passportSecret,
    handshake: true
  }))

  io.on('connection', (socket) => {
    let addedUser = false
    console.log('new connect:', socket.decoded_token)

    if (!assignedColor[socket.decoded_token.email]) {
      const color = colors[(curColor++) % colors.length]
      assignedColor[socket.decoded_token.email] = color
    }

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
      // TODO: remove after if this is not used
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
