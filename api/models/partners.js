const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Partners = new Schema({
  _id: String,
  name: String,
  exchange: String,
  position: String,
  listProjectId: [String],
  cv: String,
  profilePicture: String,
  phone: String,
  email: String,
  born: Number,
  address: String
});

module.exports = Partners;
