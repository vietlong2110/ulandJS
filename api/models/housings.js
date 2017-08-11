const mongoose = require('mongoose');
// const mongoosastic = require('mongoosastic');
const Schema = mongoose.Schema;

// const config = require('../config/mongoosastic');

const Housings = new Schema({
  _id: String,
  name: {
    type: String,
    // es_indexed: true
  },
  level: {
    type: String,
    // es_indexed: true
  },
  address: {
    type: String,
    // es_indexed: true
  },
  seller: {
    type: String,
    // es_indexed: true
  },
  timeToReceive: {
    quarter: {
      type: String,
      // es_indexed: true
    },
    year: {
      type: String,
      // es_indexed: true
    }
  },
  numberOfHouses: {
    type: String,
    // es_indexed: true
  },
  buildingDensity: {
    type: String,
    // es_indexed: true
  },
  priceInTotal: {
    min: {
      type: String,
      // es_indexed: true
    },
    max: {
      type: String,
      // es_indexed: true
    }
  },
  priceInArea: {
    min: {
      type: String,
      // es_indexed: true
    },
    max: {
      type: String,
      // es_indexed: true
    }
  },
  area: {
    min: {
      type: String,
      // es_indexed: true
    },
    max: {
      type: String,
      // es_indexed: true
    }
  },
  coordinate: {
    type: [Number],
    index: '2d'
    // es_type: "geo_point",
    // es_indexed: true
  },
  imageURL: [{
    type: String,
    // es_indexed: true
  }],
  videoURL: [{
    type: String
  }],
  generalInfo: {
    type: String,
    // es_indexed: true
  },
  detailInfo: {
    type: String,
    // es_indexed: true
  },
  housingType: {
    type: String,
    // es_indexed: true
  },
  listPartnersId: [String]
});

// Housings.plugin(mongoosastic, config.housings);

module.exports = Housings;
