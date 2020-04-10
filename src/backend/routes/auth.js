const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')

const genHash = (password) => {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) reject(err)
      bcrypt.hash(password, salt, (err, hash) => {
        if (err) reject(err)
        resolve(hash)
      })
    })
  })
}

module.exports = (app, User, config, mountPoint) => {
  router.post('/login', (req, res, next) => {
    res.send('/auth')
  })

  router.post('/signup', (req, res, next) => {
    const data = req.body
    if (!data.username || !data.password || !data.email) {
      res.json({
        ok: false,
        msg: 'All fields are required!'
      })
    } else if (data.password !== data.password2) {
      res.json({
        ok: false,
        msg: 'Passwords do not match!'
      })
    } else {
      genHash(data.password)
        .then((hash) => {
          const { password2, ...userData } = data
          userData.password = hash

          const newUser = new User(userData)
          return newUser.save()
        })
        .then((user) => {
          console.log({ user })
          res.json({
            ok: true,
            msg: 'User successfully created.'
          })
        })
        .catch((err) => {
          console.log('Error: ', err)
          res.json({
            ok: false,
            msg: err
          })
        })
    }
  })

  app.use(mountPoint, router)
}
