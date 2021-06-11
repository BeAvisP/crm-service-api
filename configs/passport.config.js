
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User.model');
const bcrypt = require('bcryptjs');

module.exports = (app) => {
  passport.serializeUser((user, cb) => {
    cb(null, user.id);
  });

  passport.deserializeUser((id, cb) => {
    User.findById(id)
      .then((user) => cb(null, user))
      .catch((error) => cb(error));
  });

  passport.use(
    new LocalStrategy(
      { passReqToCallback: true, usernameField: 'email' },
      (req, email, password, next) => {
        User.findOne({ email })
          .then((user) => {
            if (!user) {
              return next(null, false, {
                message: 'User or password incorrect',
              });
            }
            if (bcrypt.compareSync(password, user.password)) {
              return next(null, user);
            } else {
              return next(null, false, {
                message: 'User or password incorrect',
              });
            }
          })
          .catch((error) => next(error));
      }
    )
  );

  app.use(passport.initialize());
  app.use(passport.session());
};