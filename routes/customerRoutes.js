const express = require('express');
const { isLoggedIn } = require('../middlewares/auth');
const Customer = require('../models/Customer.model');
const router = express.Router();
const uploader = require('../configs/cloudinary.config');

// Route to get all customers
router.get('/', isLoggedIn, (req, res, next) => {
  Customer.find()
    .then((customers) => res.status(200).json(customers))
    .catch((err) => res.status(500).json(err));
});

// Route to get a customer by ID
router.get('/:id', isLoggedIn, (req, res, next) => {
  const { id } = req.params;

  Customer.findOne({ _id: id })
    .then((customer) => res.status(200).json(customer))
    .catch((err) => res.status(500).json(err));
});

// Route to create a customer
router.post('/', isLoggedIn, (req, res, next) => {
  const { name, surname, photo } = req.body;
  const createdBy = req.user.id;

  Customer.create({ name, surname, photo, createdBy })
    .then((customer) => res.status(200).json(customer))
    .catch((err) => res.status(500).json(err));
});

// Route to edit the customer info for logged users
router.put(
  '/:id',
  isLoggedIn,
  uploader.single('profilePic'),
  (req, res, next) => {
    const { id } = req.params;
    // TODO find current customer img before update
    Customer.findOneAndUpdate(
      { _id: id },
      {
        ...req.body,
        photo: req.file ? req.file.path : null,
        lastModifiedBy: req.user.id,
      },
      { new: true }
    )
      .then((customer) => res.status(200).json(customer))
      .catch((error) => res.status(500).json(error));
  }
);

// Route to delete a customer
router.delete('/:id', isLoggedIn, (req, res, next) => {
  const { id } = req.params;

  Customer.findOneAndRemove({ _id: id })
    .then(() => res.status(200).json({ message: `Customer ${id} deleted` }))
    .catch((err) => res.status(500).json(err));
});

module.exports = router;
