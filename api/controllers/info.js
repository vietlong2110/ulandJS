const Models = require('../database');

const detailProject = async(id) => {
  try {
    let detail = await Models.Housings.findById(id).exec();
    return Promise.resolve(detail);
  } catch(err) {
    return Promise.reject(err);
  }
};

const detailPartner = async(id) => {
  try {
    let detail = await Models.Partners.findById(id).exec();
    return Promise.resolve(detail);
  } catch(err) {
    return Promise.reject(err);
  }
};

module.exports = {
  detailProject,
  detailPartner
};
