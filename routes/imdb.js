const express = require('express');
const router = express.Router();
const {ScrapeIMDBData} = require('../api/handlers/imdbhandlers');

//Scrape IMDB Movies Data
router.get('/scrape', ScrapeIMDBData);

module.exports = router;
