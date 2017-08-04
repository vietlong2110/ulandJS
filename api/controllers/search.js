// const elastic = require('elasticsearch');
//
// const client = new elastic.Client({
//     host: process.env.NODE_ENV === 'production'
//         ? 'elasticsearch'
//         : 'localhost:9200'
// });
const Models = require('../database');
const Google = require('./google.js');
// const INDEX = 'uland';
// const TYPE = 'housing';

const listByDistance = async(location, dist) => {
  try {
    let geo = await Google.convertGeo(location);
    let list = await Models.Housings.find({
      coordinate: {
        $near: [geo.lng, geo.lat],
        $maxDistance: +dist + 1
      }
    }).exec();
    return Promise.resolve(list);
  } catch(err) {
    console.log(err);
    return Promise.reject(err);
  }
};

// const listByQuery = (offset, size, ...args) {
//
// };

module.exports = {
  listByDistance,
  // listByQuery
};
