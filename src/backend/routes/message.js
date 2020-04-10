const express = require('express')
const router = express.Router()
const passport = require('passport')

module.exports = (app, Message, config, mountPoint) => {
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
