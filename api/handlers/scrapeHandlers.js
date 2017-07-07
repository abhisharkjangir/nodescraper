const Response = require('../helpers/response');
const URLScraper = require('../scraper/Scraper');
const URLS = require('../constants/constants');
const {InsertMultitpleLaptops} = require('../daos/laptopsDao');
const {InsertMultitpleMobiles} = require('../daos/mobilesDao');
const {InsertMultitpleShoes} = require('../daos/shoesDao');
//Scrape Data Request
const scrapeData = (req, res) => {
  URLScraper(URLS.laptops, [], true).then(result => {
    res.send(Response(true, 'Success', result, []))
  })
}

//Scrape Laptops Data
const ScrapeLaptops = (req, res) => {
  if (!URLS.mobiles) {
    return res.send(Response(false,'Invalid Web URL!', [], []));
  }
  URLScraper(URLS.laptops, [], true)
  .then(x => InsertMultitpleLaptops(x))
  .then(data => res.send(Response(true,'Laptops Successfully Scraped!', data, [])))
  .catch(err => res.send(Response(false,'Error', {}, err)))
}

//Scrape Mobiles Data
const ScrapeMobiles = (req, res) => {
  if (!URLS.mobiles) {
    return res.send(Response(false,'Invalid Web URL!', [], []));
  }
  URLScraper(URLS.mobiles, [], true)
  .then(x => InsertMultitpleMobiles(x))
  .then(data => res.send(Response(true,'Mobiles Successfully Scraped!', data, [])))
  .catch(err => res.send(Response(false,'Error', [], err)))
}

//Scrape Mobiles Data
const ScrapeShoes = (req, res) => {
  if (!URLS.mobiles) {
    return res.send(Response(false,'Invalid Web URL!', [], []));
  }
  URLScraper(URLS.shoes, [], true)
  .then(x => InsertMultitpleShoes(x))
  .then(data => res.send(Response(true,'Shoes Successfully Scraped!', data, [])))
  .catch(err => res.send(Response(false,'Error', [], err)))
}

module.exports = {scrapeData,ScrapeLaptops,ScrapeMobiles,ScrapeShoes};
