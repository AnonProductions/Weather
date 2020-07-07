const request = require('request');

const geoCode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoicmFuZG9tdGlzdG9ydGkiLCJhIjoiY2tjN3p6MW82MTJhNTJxdDY5d2xyMGRkNyJ9.94S6Blk49cXiss7zmSb4YA&limit=1`;

  request(
    {
      url,
      json: true,
    },
    (err, res) => {
      if (err) {
        callback('Unable to connect to location service!');
      } else if (res.body.message) {
        callback(res.body.message);
      } else if (res.body.features.length === 0) {
        callback('Unable to find location! Try with another location.');
      } else {
        callback(undefined, {
          latitude: res.body.features[0].center[1],
          longitude: res.body.features[0].center[0],
          location: res.body.features[0].place_name,
        });
      }
    }
  );
};

module.exports = geoCode;
