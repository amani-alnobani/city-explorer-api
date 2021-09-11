require('dotenv').config();
const axios = require('axios');
const MOVIE_API_KEY = process.env.MOVIE_API_KEY;
const Movie = require('../models/movie.model');
const Cache = require('../helper/cache.helper');

let cacheObject = new Cache();

const moveFun = async (request, res) => {

    const city_name = request.query.query;
    const foundData = cacheObject.movies.find(item => item.city_name === city_name);
    if (foundData) {
        res.json(foundData.data);
    } else {
        const movieUrl = `https://api.themoviedb.org/3/search/movie?query=${city_name}&api_key=${MOVIE_API_KEY}`;
        if (movieUrl) {
            const movieDetales = await axios.get(`${movieUrl}`);
            let newMovie = movieDetales.data.results.map(item => {
                return new Movie(item.title, item.overview, item.vote_count);
            });
            cacheObject.movies.push({
                "city-name": city_name,
                'data': newMovie
            })
            res.json(newMovie);
        } else {
            res.json('no data');
        }
    }
};

module.exports = moveFun;
