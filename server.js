'use strict';
const express = require('express');
const app = express();
const cors = require('cors');
const axios = require('axios');
app.use(cors());

require('dotenv').config();

const WEATHER_API_KEY = process.env.WEATHER_API_KEY;

// const weather = require('./data/weather.json');
app.get('/',
  function (req, res) {
    res.send('Hello World');
  });
class Forecast {
  constructor(date, description) {
    this.date = date;
    this.description = description;
  }

}

app.get('/weather', async (req, res) => {

  let lat = req.query.lat;
  let lon = req.query.lon;

  const weatherBitUrl = 'https://api.weatherbit.io/v2.0/forecast/daily';
  try{
    const weatherBitResponse = await axios.get(`${weatherBitUrl}?lat=${lat}&lon=${lon}&key=${WEATHER_API_KEY}`);
    const returnArray = weatherBitResponse.data.data.map((item) => {

      return new Forecast(item.datetime, item.weather.description);
    });
    res.json(returnArray);
  }

  catch (error) {
    res.json(error);
  }
});
app.listen(3001,()=>{
});
