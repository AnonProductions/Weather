const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geoCode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const port = process.env.PORT || 3000;

const app = express();

// Define paths for express config
const publicDirectory = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views, partials location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectory));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Andrew Mead',
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    name: 'Andrew',
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    name: 'Andrew',
  });
});

app.get('/weather', (req, res) => {
  const { address } = req.query;

  if (!address) {
    res.send({
      error: 'You must provide an address!',
    });
    return;
  }

  geoCode(address, (err, data) => {
    if (err) {
      res.send({
        error: err,
      });
      return;
    }

    const { latitude, longitude, location } = data;

    forecast(latitude, longitude, (err, forecastData) => {
      if (err) {
        res.send({
          error: err,
        });
        return;
      }

      res.send({
        location,
        forecastData,
      });
    });
  });
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Andrew',
    message: 'Help article not found!',
    css: './../css/styles.css',
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Andrew',
    message: 'My 404 Page',
    css: './css/styles.css',
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
