'use strict';
const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());


const weather = require('./data/weather.json')
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

app.get('/weather', (req, res) => {
    // console.log(request);

    let city_name = req.query.city_name;
    let lat = req.query.lat;
    let lon = req.query.lon;

    //    res.send(weather[0].lat);

    //  && item.lat === lat && item.lon === lon

    const returnArray = weather.find((item) => {
        return (item.city_name.toLowerCase() === city_name.toLowerCase())
    });
    if (returnArray) {
        let newArr = returnArray.data.map((item) => {
            return new Forecast(item.datetime, item.weather.description);
        });
        res.json(newArr);
    }
    else {
        res.json('data not found');
    }


});

app.listen(3004)