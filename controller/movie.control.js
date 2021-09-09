require('dotenv').config();
const axios = require('axios');
const MOVIE_API_KEY = process.env.MOVIE_API_KEY;
const Movie = require('../models/movie.model');

const moveFun = async (request, res) => {
    const city_name = request.query.query;
    const movieUrl = `https://api.themoviedb.org/3/search/movie?query=${city_name}&api_key=${MOVIE_API_KEY}`;
    const movieDetales = await axios.get(movieUrl);
    if (city_name) {
        let newMovie = movieDetales.data.results.map(item => {
            return new Movie(item.title, item.overview, item.vote_count);
        });
        res.json(newMovie);
    } else {
        res.json('no data');
    }
};

module.exports = moveFun;
