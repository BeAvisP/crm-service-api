const express = require('express');
const passport = require('passport');
const router = express.Router();
const User = require('../models/User.model');
const { isLoggedOut, isLoggedIn, isAdmin } = require('../middlewares/auth');
const uploader = require('../configs/cloudinary.config');
const bcrypt = require('bcryptjs');
const bcryptSalt = 10;

// Route to create new users only by Admin role
router.post('/new', isAdmin, (req, res, next) => {
  const { firstName, lastName, email, password, role } = req.body;

  if (password.length < 6) {
    return res.status(400).json({
      message: 'Please make your password at least 6 characters long.',
    });
  }

  if (!email || !firstName || !lastName) {
    return res
      .status(400)
      .json({ message: 'Please fill all the filds in the form.' });
  }

  User.findOne({ email })
    .then((user) => {
      if (user) {
        return res
          .status(400)
          .json({ message: 'User already exists. Please change your email.' });
      }

      const salt = bcrypt.genSaltSync(bcryptSalt);
      const hashPass = bcrypt.hashSync(password, salt);

      User.create({
        firstName,
        lastName,
        email,
        password: hashPass,
        role,
      })
        .then((newUser) => {
          req.login(newUser, (error) => {
            if (error) {
              return res.status(500).json(error);
            }
            return res.status(201).json(newUser);
          });
        })
        .catch((error) => res.status(500).json(error));
    })
    .catch((error) => res.status(500).json(error));
});

// Route to do de user (user or admin) login
router.post('/login', isLoggedOut, (req, res, next) => {
  passport.authenticate('local', (error, theUser, failureDetails) => {
    if (error) {
      return res.status(500).json(error);
    }
    if (!theUser) {
      return res.status(401).json(failureDetails);
    }
    req.login(theUser, (error) => {
      if (error) {
        return res.status(500).json(error);
      }
      return res.status(200).json(theUser);
    });
  })(req, res, next);
});

// Route to do the user logout
router.post('/logout', isLoggedIn, (req, res, next) => {
  req.logout();
  return res.status(200).json({ message: 'Log out success!' });
});

// Route to edit the user info for Admin role
router.put(
  '/edit',
  isAdmin,
  uploader.single('profilePic'),
  (req, res, next) => {
    User.findOneAndUpdate(
      { _id: req.user.id },
      {
        ...req.body,
        profilePic: req.file ? req.file.path : req.user.profilePic,
      },
      { new: true }
    )
      .then((user) => res.status(200).json(user))
      .catch((error) => res.status(500).json(error));
  }
);

// Route to get the user info when the user is loggedin
router.get('/loggedin', (req, res, next) => {
  if (req.isAuthenticated()) {
    return res.status(200).json(req.user);
  } else {
    return res.status(403).json({ message: 'Forbbiden' });
  }
});

// Route to delete a user only accesible for Admin role
router.delete('/delete', isAdmin, (req, res, next) => {
  User.findByIdAndRemove(req.user.id)
    .then(() => res.status(200).json({ message: 'User removed' }))
    .catch((error) => res.status(500).json(error));
});

module.exports = router;