const express = require('express')
const router = express.Router()
const passport = require('passport')

module.exports = (app, io, Message, User,
  config, assignedColor, mountPoint) => {
  router.get('/',
    [passport.authenticate('jwt', { session: false })],
    (req, res, next) => {
      const process = (messages) => {
        return messages.map(msg => {
          return User.findOne({ _id: msg.userId })
            .then(user => {
              const data = {
                username: user.username,
                content: msg.content,
                date: msg.createdAt
              }
              return Promise.resolve(data)
            })
        })
      }

      Message.find({})
        .sort({ createdAt: -1 })
        .limit(10)
        .exec()
        .then(messages => Promise.all(process(messages)))
        .then(data => {
          res.json({
            ok: false,
            data: data
          })
        })
        .catch(err => {
          res.json({
            ok: false,
            data: err.message
          })
        })
    })

  router.post('/',
    [passport.authenticate('jwt', { session: false })],
    (req, res, next) => {
      const data = {
        userId: req.user._id,
        ...req.body
      }

      const newMessage = new Message(data)
      newMessage.save()
        .then((message) => {
          const msg = {
            username: req.user.username,
            content: message.content,
            date: message.createdAt,
            color: assignedColor[req.user.email]
          }

          io.emit('newMessage', msg)
          res.json({
            ok: true,
            msg: 'Message created successfully.'
          })
        })
        .catch((err) => {
          console.log('Error: ', err)
          res.json({
            ok: false,
            msg: 'Error creating Message!'
          })
        })
    })

  app.use(mountPoint, router)
}
