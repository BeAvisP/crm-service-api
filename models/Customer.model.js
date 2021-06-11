const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const customerSchema = new Schema(
  {
    name: { type: String, required: true },
    surname: { type: String, required: true },
    photo: {
      type: String,
      default:
        'https://cdn.pixabay.com/photo/2017/06/13/12/53/profile-2398782_960_720.png',
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    lastModifiedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        ret.id = doc._id;
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

const Customer = mongoose.model('Customer', customerSchema);
module.exports = Customer;
