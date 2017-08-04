const mongoose = require('mongoose');

const { Housings, Partners } = require('./models');

let hostname = process.env.NODE_ENV === 'production' ||
  process.env.NODE_ENV === 'development' ? 'mongo': 'localhost';

let readyState = mongoose.connection.readyState;
if (readyState !== 1 || readyState !== 2)
  mongoose.connect(`mongodb://${hostname}/uland`);

let housings = mongoose.model('Housings', Housings);
// housings.createMapping({
//     housings: {
//         properties: {
//             coordinate: { type: "geo_point" }
//         }
//     }
// });
// housings.synchronize();

let partners = mongoose.model('Partners', Partners);

module.exports = {
  Housings: housings,
  Partners: partners
};
