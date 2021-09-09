require('dotenv').config();
const axios = require('axios');
const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
const Forecast = require('../models/wether.model');

const wetherfun = async (request, res) => {
    const city_name = request.query.city;
    const weatherUrl = `https://api.weatherbit.io/v2.0/forecast/daily?`;
    const weatherUrlUsed = await axios.get(`${weatherUrl}city=${city_name}&key=${WEATHER_API_KEY}`);

    if (city_name) {
        let newArray = weatherUrlUsed.data.data.map(item => {
            return new Forecast(item.datetime, item.weather.description);
        });
        res.json(newArray);
    } else {
        res.json('no data ');
    }
};

module.exports = wetherfun;
