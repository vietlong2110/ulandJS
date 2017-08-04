//convert csv json to something importable

const jsonCC = require('../convertcsv.json');
const jsonBT = require('../convertcsv-2.json');
const jsonDetailCC = require('../convertcsv-3.json');
const jsonDetailBT = require('../convertcsv-4.json');
const jsonListDT = require('../convertcsv-5.json');

let resultCC = [];
let resultBT = [];
let resultDetailCC = [];
let resultDetailBT = [];
let resultDT = [];
let id, name, level, address, seller, timeToReceive, numberOfHouses,
buildingDensity, priceInTotal, priceInArea, area, coordinate, imageURL,
generalInfo, detailInfo, exchange, position, listProjectId, cv, profilePicture,
phone, email, born;

//import apartment
for (let i = 1; i < jsonCC.length; i++) {
  let current = jsonCC[i];
  id = current[1];
  if (id === null || id === '')
    continue;
  name = current[2];
  level = current[3];
  address = '';
  for (let j = 4; j < 8; j++)
    address += current[j] + ' ';
  seller = current[8];
  timeToReceive = {
    quarter: current[10],
    year: current[11]
  };
  numberOfHouses = current[12];
  buildingDensity = current[13];
  priceInTotal = {
    min: current[14],
    max: current[15]
  };
  priceInArea = {
    min: current[16],
    max: current[17]
  };
  area = {
    min: current[18],
    max: current[19]
  };
  coordinate = [+current[21], +current[20]];
  imageURL = [];
  for (let j = 22; j < current.length; j++)
    if (current[j] !== null && current[j] !== '' && current[j].substring(0,4) === 'http')
      imageURL = imageURL.concat(current[j]);
  resultCC = resultCC.concat({
    id, name, level, address, seller, timeToReceive, numberOfHouses,
    buildingDensity, priceInTotal, priceInArea, area, coordinate, imageURL,
    housingType: 'CC'
  });
}

//import villa
for (let i = 1; i < jsonBT.length; i++) {
  let current = jsonBT[i];
  id = current[1];
  if (id === null || id === '')
    continue;
  name = current[2];
  level = current[3];
  address = '';
  for (let j = 4; j < 8; j++)
    address += current[j] + ' ';
  seller = current[8];
  timeToReceive = {
    quarter: current[10],
    year: current[11]
  };
  numberOfHouses = 0;
  for (let j = 12; j < 17; j++)
    if (current[j] !== null && current[j] !== '')
      numberOfHouses += +current[j];
  buildingDensity = current[17];
  priceInTotal = {
    min: current[18],
    max: current[19]
  };
  priceInArea = {
    min: current[20],
    max: current[21]
  };
  area = {
    min: current[22],
    max: current[23]
  };
  coordinate = [+current[25], +current[24]];
  imageURL = [];
  for (let j = 26; j < current.length; j++)
    if (current[j] !== null && current[j] !== '' && current[j].substring(0,4) === 'http')
      imageURL = imageURL.concat(current[j]);
  resultBT = resultBT.concat({
    id, name, level, address, seller, timeToReceive, numberOfHouses,
    buildingDensity, priceInTotal, priceInArea, area, coordinate, imageURL,
    housingType: 'BT'
  });
}

//import detail apartment
for (let i = 0; i < jsonDetailCC.length; i++) {
  let current = jsonDetailCC[i];
  id = current[1];
  if (id === null || id === '')
    continue;
  name = current[2];
  generalInfo = current[3];
  detailInfo = current[4];
  resultDetailCC = resultDetailCC.concat({
    id, name, generalInfo, detailInfo
  });
}

// import detail villa
for (let i = 0; i < jsonDetailBT.length; i++) {
  let current = jsonDetailBT[i];
  id = current[1];
  if (id === null || id === '')
    continue;
  name = current[2];
  generalInfo = current[3];
  detailInfo = current[4];
  resultDetailBT = resultDetailBT.concat({
    id, name, generalInfo, detailInfo
  });
}

//import partners
for (let i = 0; i < jsonListDT.length; i++) {
  let current = jsonListDT[i];
  id = current[1];
  if (id === null || id === '')
    continue;
  name = current[2];
  exchange = current[3];
  position = current[4];
  let arr = current[5].split(/[,\n ]/g);
  listProjectId = [];
  for (j in arr)
    if (arr[j] !== null && arr[j] !== '')
      listProjectId = listProjectId.concat(arr[j]);
  cv = current[7];
  profilePicture = current[9];
  phone = current[10];
  email = current[11];
  born = current[12];
  address = current[13];
  resultDT = resultDT.concat({
    id, name, exchange, position, listProjectId, cv, profilePicture,
    phone, email, born, address
  });
}

module.exports = {
  apartments: resultCC,
  detailApartments: resultDetailCC,
  villas: resultBT,
  detailVillas: resultDetailBT,
  listPartners: resultDT
};
