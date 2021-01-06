const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user');
const config = require('../config/database');

let opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.secret;

module.exports = function (passport) {
  passport.use('jwt', new JwtStrategy(opts, (jwt_payload, done) => {
      User.getUserById(jwt_payload.id, (error, user) => {
        if (error) {
          return done(error, false);
        }

        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      });
    })
  );
};
