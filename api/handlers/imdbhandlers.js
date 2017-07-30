const Response = require('../helpers/response');
const URLScraper = require('../imdb/scraper');
const URLS = require('../constants/constants');
const {InsertMultitpleMovies} = require('../daos/imdbDao');

//Scrape Mobiles Data
const ScrapeIMDBData = (req, res) => {
  if (!URLS.IMDB) {
    return res.send(Response(false,'Invalid Web URL!', [], []));
  }
  URLScraper(URLS.IMDB, [], true,req.query.limit)
  .then(x => InsertMultitpleMovies(x))
  .then(data => res.send(Response(true,'Movies Successfully Scraped!', data, [])))
  .catch(err => res.send(Response(false,'Error', [], err)))
}

module.exports = {ScrapeIMDBData};
