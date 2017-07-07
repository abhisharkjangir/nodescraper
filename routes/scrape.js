const express = require('express');
const router = express.Router();
const {scrapeData,ScrapeLaptops,ScrapeMobiles,ScrapeShoes} = require('../api/handlers/scrapeHandlers');

//Scrape Laptops Data
router.get('/scrape/laptops', ScrapeLaptops);
//Scrape Mobiles Data
router.get('/scrape/mobiles', ScrapeMobiles);
//Scrape Shoes Data
router.get('/scrape/shoes', ScrapeShoes);

module.exports = router;
