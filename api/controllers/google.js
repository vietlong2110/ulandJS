require('isomorphic-fetch');

const API_KEY = 'AIzaSyBbf8SUfyWfP_6UzhQx74CkMyn7sJwIMcw';
const GOOGLE_MAP_API = 'https://maps.googleapis.com/maps/api';
const GEO_API_ENDPOINT = GOOGLE_MAP_API + '/geocode/json?key=' + API_KEY;

const responseHandler = response =>
    response.status >= 400 ? Promise.reject(response.status) : response.json();

const convertGeo = location =>
  fetch(GEO_API_ENDPOINT + '&address=' + encodeURIComponent(location))
  .then(responseHandler)
  .then(response => {
    if (response.results.length === 0)
      return Promise.resolve();
    return Promise.resolve(response.results[0].geometry.location);
  });
module.exports = {
  convertGeo
};
