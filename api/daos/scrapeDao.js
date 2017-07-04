const Request = require('request-promise');
const cheerio = require('cheerio');




const ScrapeDao = (webURL) => {
  return Request(webURL)
  .then(data => processHtml(data))
  .then(data => {return data})
  .catch(err => {return err})
}

const processHtml = (html) => {
  return new Promise(function(resolve, reject) {
    var mobile = {};
    var $ = cheerio.load(html);
    // $('._2-gKeQ').filter(function(){
    //   var data = $(this);
    //   var img = data.children('img');
    //   console.log(img);
    // })
    // console.log($('._2-gKeQ').find('img')[0].attr('src'));
    // $('._2-gKeQ').each(function(i, elem) {
    //   console.log(elem);
    //   mobile.images[i] = elem
    //   // fruits[i] = $(this).text();
    // });
    resolve(mobile)
  });
}

module.exports = ScrapeDao;
