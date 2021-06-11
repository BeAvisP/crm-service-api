require('dotenv');
const mongoose = require('mongoose');
const User = require('../models/User.model');
const bcrypt = require('bcryptjs');
const bcryptSalt = 10;

const salt = bcrypt.genSaltSync(bcryptSalt);
const hashPass = bcrypt.hashSync('123456', salt);

const adminUserData = {
  email: 'admin@crm-service.com',
  firstname: 'Admin',
  lastname: 'User',
  password: hashPass,
  role: 'admin',
}

mongoose
  .connect(`mongodb://localhost/crm-service`, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    User.create(adminUserData).then(() => {
      console.log(`Admin user created`);
      mongoose.disconnect();
    });
  })
  .catch((err) => console.error('Error connecting to mongo', err));
