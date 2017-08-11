const mongoose = require('mongoose');
// const mongoosastic = require('mongoosastic');
const Schema = mongoose.Schema;
// const config = require('../config/mongoosastic');

const Comments = new Schema({
  name: {
    type: String,
    // es_indexed: true
  },
  content: {
    type: String
  },
  projectId: {
    type: String
  },
  postedTime: {
    type: Date,
    default: Date.now
  }
});

// Housings.plugin(mongoosastic, config.housings);

module.exports = Comments;
