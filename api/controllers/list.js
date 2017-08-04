const Models = require('../database');

const SIZE = 30;

const Apartments = async(offset, size = SIZE) => {
  try {
    let apartments = await Models.Housings.find({

    }).lean().exec();
    return Promise.resolve(apartments);
  } catch(err) {
    return Promise.reject(err);
  }
};

const Villas = async(offset, size = SIZE) => {
  try {
    let villas = await Models.Housings.find({

    }).lean().exec();
    return Promise.resolve(villas);
  } catch(err) {
    return Promise.reject(err);
  }
};

const Partners = async(offset, size = SIZE) => {
  try {
    let partners = await Models.Partners.find({

    }).lean().exec();
    return Promise.resolve(partners);
  } catch(err) {
    return Promise.reject(err);
  }
};

module.exports = {
  Apartments,
  Villas,
  Partners
};
