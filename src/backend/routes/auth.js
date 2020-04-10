const express = require('express')
const router = express.Router()

module.exports = (app, mountPoint) => {
  router.get('/', (req, res, next) => {
    res.send('/auth')
  })

  app.use(mountPoint, router)
}
