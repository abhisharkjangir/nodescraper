const Response  = require('../helpers/response');
const ScrapeDao = require('../daos/ScrapeDao');
const WebUrl = require('../constants/constants');

//Scrape Data Request
const scrapeData = (req,res) => {
  return ScrapeDao(WebUrl)
  .then(data => res.send(Response(true,'Success',data,[])))
  .catch(err => res.send(Response(false)))
}

module.exports = scrapeData;
