'use strict';
const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
require('dotenv').config();

const axios = require('axios');
const getwrather = require('./controller/wether.controller');
const getmovie = require('./controller/movie.control');
const PORT=process.env.PORT;

app.get('/weathers',getwrather);
app.get('/movies', getmovie);
app.listen(PORT);
