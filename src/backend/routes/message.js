const express = require('express')
const router = express.Router()
const passport = require('passport')

module.exports = (app, io, Message, config, mountPoint) => {
  router.get('/',
    [passport.authenticate('jwt', { session: false })],
    (req, res, next) => {
      Message.find({})
        .sort({ createdAt: -1 })
        .limit(2)
        .exec((err, messages) => {
          if (err) {
            res.json({
              ok: false,
              msg: err.message
            })
          } else {
            res.json({
              ok: true,
              data: messages
            })
          }
        })
    })

  router.post('/',
    [passport.authenticate('jwt', { session: false })],
    (req, res, next) => {
      console.log('user: ', req.user)
      const data = {
        userId: req.user._id,
        ...req.body
      }

      const newMessage = new Message(data)
      newMessage.save()
        .then((message) => {
          console.log({ message })
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
