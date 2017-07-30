const Request = require('request-promise');
const cheerio = require('cheerio');
const co = require('co');
const Items = [];
var pageCount = 0;

const IP = (fn) => new Promise((resolve, reject) => {
  try {
    resolve(fn())
  } catch (e) {
    reject(e)
  }
})

const PromiseResolver = (url, datax, thenable,limit) => co(function*() {
  if (!thenable) {
    return IP(() => datax)
  }
  const HTML = yield Request(url);
  let processedData = HTMLProcessor(HTML, url);
  pageCount += 1;
  console.log(pageCount);
  if (processedData.nextUrl && pageCount < limit) {
    return PromiseResolver(processedData.nextUrl, processedData.list.concat(datax), true,limit);
  } else {
    return PromiseResolver(null, processedData.list.concat(datax), false,limit);
  }
})

const HTMLProcessor = (html, url) => {
  let $ = cheerio.load(html);
  let infodiv = $("#title-overview-widget");
  let ItemList = [];
  let movie = {};
  let temp =  url.split('/');
  let imdbId = temp[temp.length - 1];
  movie.id = imdbId;
  // Get Movie Name
  movie.name = $(infodiv).find('.title_wrapper').find('h1').text().trim();
  //Get Movie Rating
  movie.rating = {
    total: 10,
    count: parseInt($('span[itemprop=ratingCount]').text().split(',').join('')),
    value: parseFloat($('span[itemprop=ratingValue]').text())
  };
  //Get Movie Description
  let descArr = $('div[itemprop=description]');
  movie.description = $(descArr[1]).find('p').text().trim().split('       ')[0];
  //Get Movie Trailer
  movie.trailer = $('div[class=slate]').find('a').attr('href') ? 'http://www.imdb.com' +  $('div[class=slate]').find('a').attr('href') : undefined;
  //Get Movie Poster
  movie.poster = $('div[class=poster]').find('img').attr('src') || undefined;
  //Get Movie Duration
  let timeArr = $('time[itemprop=duration]');
  movie.duration = $(timeArr[1]).text() || undefined;
  // Get Movie Genre
  movie.genre = getMovieGenre($) || undefined;
  //Get Movie Keywords
  movie.keywords = getMovieKeywords($) || undefined;
  //Get Movie Director
  movie.director = $('span[itemprop=director]').find('a').text() || undefined;
  //Get Movie Creators
  movie.creator = getMovieCreators($) || undefined;
  //Get Movie Actors
  movie.actors = getMovieActors($) || undefined;
  //Get Movie's other details
  let txtBlocks = $('div.txt-block');
  txtBlocks.each( function(index, txtBlock) {
    if ($(txtBlock).find('h4').text().length > 0) {
      //Parents Guide
      if ($(txtBlock).find('h4').text() == 'Parents Guide:') {
        movie.parentsGuide = $(txtBlock).find('span').find('a').text().trim() || undefined;
      }
      //Country
      if ($(txtBlock).find('h4').text() == 'Country:') {
        movie.country = $(txtBlock).find('a').text().trim() || undefined;
      }
      //Release Date:
      if ($(txtBlock).find('h4').text() == 'Release Date:') {
        movie.releaseDate = $(txtBlock).text().split(':')[1].split('\n')[0].trim() || undefined;
      }
      //Aspect Ratio
      if ($(txtBlock).find('h4').text() == 'Aspect Ratio:') {
        movie.aspectRatio = ($(txtBlock).text().split(':')[1] + ':' + $(txtBlock).text().split(':')[2]).trim() || undefined;
      }
      //Filming Locations:
      if ($(txtBlock).find('h4').text() == 'Filming Locations:') {
        movie.filmingLocations = $(txtBlock).find('a').text().trim() || undefined;
      }
      //Production co
      if ($(txtBlock).find('h4').text() == 'Production Co:') {
        movie.productionCo = $(txtBlock).find('a').find('span[itemprop=name]').text().trim() || undefined;
      }
      //Sound Mix
      if ($(txtBlock).find('h4').text() == 'Sound Mix:') {
        movie.soundMix = $(txtBlock).find('a').text().trim() || undefined;
      }
      //Color
      if ($(txtBlock).find('h4').text() == 'Color:') {
        movie.color = $(txtBlock).find('a').text().trim() || undefined;
      }
    }
  });
  //Push Movie in list
  ItemList.push(movie);
  return {
    nextUrl: nextLinkGenerator(url),
    list: ItemList
  };
}

const nextLinkGenerator = (url) => {
  if (url) {
    let temp =  url.split('/');
    let imdbId = temp[temp.length - 1];
    let nextImdbId = parseInt('1' + imdbId.split('tt')[1]) + 1;
    return 'http://www.imdb.com/title/tt' + (nextImdbId.toString().slice(1));
  }
};

const getMovieGenre = ($) => {
  let genreAnchors = $('div[itemprop=genre]').find('a');
  let genres = [];
  for (let i = 0; i < genreAnchors.length; i++) {
    genres.push({name : $(genreAnchors[i]).text().trim(),link : 'http://www.imdb.com' + $(genreAnchors[i]).attr('href')});
  }
  return genres.length > 0? genres : undefined;
};

const getMovieKeywords = ($) => {
  let keywordsAnchors = $('div[itemprop=keywords]').find('a');
  let keywords = [];
  for (let i = 0; i < keywordsAnchors.length; i++) {
    keywords.push({name : $(keywordsAnchors[i]).text().trim(),link : 'http://www.imdb.com' + $(keywordsAnchors[i]).attr('href')});
  }
  return keywords.length > 0? keywords : undefined;
}

const getMovieCreators = ($) => {
  let creatorAnchors = $('span[itemprop=creator]').find('a');
  let creators = [];
  for (let i = 0; i < creatorAnchors.length; i++) {
    creators.push({name : $(creatorAnchors[i]).text().trim(),link : 'http://www.imdb.com' + $(creatorAnchors[i]).attr('href')});
  }
  return creators.length > 0? creators : undefined;
};

const getMovieActors = ($) => {
  let actorAnchors = $('span[itemprop=actors]').find('a');
  let actors = [];
  for (let i = 0; i < actorAnchors.length; i++) {
    actors.push({name : $(actorAnchors[i]).text().trim(),link : 'http://www.imdb.com' + $(actorAnchors[i]).attr('href')});
  }
  return actors.length > 0? actors : undefined ;
};


module.exports = PromiseResolver;
