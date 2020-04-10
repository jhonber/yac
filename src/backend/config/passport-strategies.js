const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const opts = {}

module.exports = function (User, config) {
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
  opts.secretOrKey = config.passportSecret

  passport.use(new JwtStrategy(opts, function (jwtPayload, done) {
    const data = { email: jwtPayload.email }

    User.findOne(data, function (err, user) {
      if (err) {
        return done(err, false)
      }
      if (user) {
        return done(null, user)
      } else {
        return done(null, false)
      }
    })
  }))
}
