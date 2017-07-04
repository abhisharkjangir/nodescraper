const express = require('express');
const router = express.Router();
const scrapeData = require('../api/handlers/scrapeHandlers');

// GET Movies List
router.get('/scrape', scrapeData);

module.exports = router;
