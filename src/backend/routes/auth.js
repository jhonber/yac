const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jwt-simple')

const genSalt = () => {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) reject(err)
      resolve(salt)
    })
  })
}

const genHash = (salt, password) => {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, salt, (err, hash) => {
      if (err) reject(err)
      resolve(hash)
    })
  })
}

module.exports = (app, User, config, mountPoint) => {
  router.post('/login', (req, res, next) => {
    const data = req.body

    User.findOne({ email: data.email })
      .then((user) => {
        console.log({ user })
        console.log(user.password)
        return bcrypt.compare(data.password, user.password)
      })
      .then((result) => {
        console.log({ result })
        if (result) {
          const email = { email: data.email }
          const token = jwt.encode(email, config.passportSecret)
          return res.json({
            ok: true,
            token: token
          })
        } else {
          return res.json({
            ok: false,
            msg: 'Bad credential!'
          })
        }
      })
      .catch((err) => {
        console.log('Error: ', err)
        res.json({
          ok: false,
          msg: err.message
        })
      })
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
      genSalt()
        .then((salt) => {
          return genHash(salt, data.password)
        })
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
