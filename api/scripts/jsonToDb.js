const mongoose = require('mongoose');

const { Housings, Partners } = require('../database');
const {
  apartments,
  detailApartments,
  villas,
  detailVillas,
  listPartners
} = require('./reformJSON');

const housings = apartments.concat(villas);
const detailHousings = detailApartments.concat(detailVillas);
// console.log(housings.length);
// console.log(detailHousings.length);

// const preProcess = house => {
//   let {
//     timeToReceive, numberOfHouses,
//     buildingDensity, priceInTotal, priceInArea, area, coordinate
//   } = house;
//   if (timeToReceive.quarter !== null && timeToReceive.quarter !== '')
//     timeToReceive.quarter = +timeToReceive.quarter;
//   if (timeToReceive.year !== null && timeToReceive.year !== '')
//     timeToReceive.year = +timeToReceive.year;
//   if (numberOfHouses !== null && numberOfHouses !== '')
//     numberOfHouses = +numberOfHouses;
//   if (buildingDensity !== null && buildingDensity !== '')
//     buildingDensity = +buildingDensity;
//   if (priceInTotal.min !== null && priceInTotal.min !== '')
//     priceInTotal.min = +priceInTotal.min;
//   if (priceInTotal.max !== null && priceInTotal.max !== '')
//     priceInTotal.max = +priceInTotal.max;
//   if (priceInArea.min !== null && priceInArea.min !== '')
//     priceInArea.min = +priceInArea.min;
//   if (priceInArea.max !== null && priceInArea.max !== '')
//     priceInArea.max = +priceInArea.max;
//   if (area.min !== null && area.min !== '')
//     area.min = +area.min;
//   if (area.max !== null && area.max !== '')
//     area.max = +area.max;
//   if (coordinate.lat !== null && coordinate.lat !== '')
//     coordinate.lat = +coordinate.lat;
//   if (coordinate.lng !== null && coordinate.lng !== '')
//     coordinate.lng = +coordinate.lng;
//
// }

const updateHouseSellerList = async(id, listProjectId) => {
  if (listProjectId.length === 0)
    return Promise.resolve();
  for (i in listProjectId) {
    try {
      let house = await Housings.findById(listProjectId[i]).exec();
      if (!house) {
        console.log(listProjectId[i]);
        console.log('House ' + listProjectId[i] + ' didn\'t exist!');
        continue;
      }
      if (house.listPartnersId.indexOf(id) === -1) {
        house.listPartnersId = house.listPartnersId.concat(id);
        await house.save();
      }
    } catch(err) {
      return Promise.reject(err);
    }
  }
  return Promise.resolve();
};

const importHousings = async() => {
  //import housing
  for (i in housings) {
    let {
      id, name, level, address, seller, timeToReceive, numberOfHouses,
      buildingDensity, priceInTotal, priceInArea, area, coordinate, imageURL,
      housingType
    } = housings[i];
    let newHouse = new Housings({
      _id: id,
      name, level, address, seller, timeToReceive, numberOfHouses,
      buildingDensity, priceInTotal, priceInArea, area, coordinate, imageURL,
      housingType
    });
    try {
      let house = await Housings.findById(id).exec();
      if (!house) {
        house = await newHouse.save();
        console.log('Saved house ' + house._id);
      }
      else console.log('Already saved ' + house._id);
    } catch(err) {
      console.log(err);
    }
  }

  //import detail housing
  for (i in detailHousings) {
    let {
      id, generalInfo, detailInfo
    } = detailHousings[i];
    try {
      let house = await Housings.findById(id).exec();
      if (!house)
        console.log('House ' + id + ' didn\'t exist!');
      else {
        house.generalInfo = generalInfo;
        house.detailInfo = detailInfo;
        await house.save();
        console.log('Editted house ' + id + ' details successfully!');
      }
    } catch(err) {
      console.log(err);
    }
  }
};

const importPartners = async() => {
  //import partners
  for (i in listPartners) {
    let {
      id, name, exchange, position, listProjectId, cv, profilePicture,
      phone, email, born, address
    } = listPartners[i];
    let newPartner = new Partners({
      _id: id,
      listProjectId,
      name, exchange, position, cv, profilePicture,
      phone, email, born, address
    });
    try {
      let partner = await Partners.findById(id).exec();
      if (!partner) {
        partner = await newPartner.save();
        try {
          await updateHouseSellerList(id, listProjectId);
          console.log('Saved partner ' + partner._id);
        } catch(err) {
          console.log(err);
        }
      }
      else console.log('Already saved ' + partner._id);
    } catch(err) {
      console.log(err);
    }
  }
};

const Import = async() => {
  await importHousings();
  await importPartners();
};

Import();
