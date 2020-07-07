const request = require('request');

const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=02de38b629f1a12a545623f7c0c9b57b&query=${latitude},${longitude}`;

  request(
    {
      url,
      json: true,
    },
    (err, res) => {
      if (err) {
        callback('Unable to connect to the weather service!');
      } else if (res.body.error) {
        callback(`${res.body.error.info}`);
      } else {
        const weatherData = res.body.current;
        const {
          temperature,
          feelslike,
          weather_descriptions: weatherDescriptions,
        } = weatherData;
        callback(
          undefined,
          `${
            weatherDescriptions[0]
          }. It is currently ${temperature} degrees out. It feels like ${feelslike} degrees out.`
        );
      }
    }
  );
};

module.exports = forecast;
