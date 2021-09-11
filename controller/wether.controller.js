require('dotenv').config();
const axios = require('axios');
const WETHER_API_KEY = process.env.WETHER_API_KEY;
const Forecast = require('../models/wether.model');
const Cache = require('../helper/cache.helper');

let cacheObject = new Cache();

const wetherfun = async (request, res) => {
    // const city_name = request.query.city;
    const { lon, lat } = request.query;

    const foundData = cacheObject.forecast.find(location => location.lat === lat && location.lon === lon);
    if (foundData) {
        res.json(foundData.data);
    } else {
        const weatherUrl = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${WETHER_API_KEY}`;
        if (weatherUrl) {
            const weatherUrlUsed = await axios.get(`${weatherUrl}`);
            let newArray = weatherUrlUsed.data.data.map(item => {
                return new Forecast(item.datetime, item.weather.description);
            });
            cacheObject.forecast.push({
                'lat':lat,
                'lon':lon,
                'data':newArray
            })
            res.json(newArray);
        } else {
            res.json('no data ');
        }
    }
};

module.exports = wetherfun;
