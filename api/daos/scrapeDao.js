const Request = require('request-promise');
const cheerio = require('cheerio');
const Items = [];


const ScrapeDao = (webURL) => {
  return new Promise(function(resolve, reject) {
    scraper(webURL);
  });
}

const scraper = (url) => {
  Request(url).
  then(x =>  {console.log(url);HTMLProcessor(x)})
  .then(x => {
    if (x.list.length > 0) {
      Items.concat(x.list)
    }
    if (x.nextPage) {
      scraper(x.nextPage);
    }else {
      return Items;
    }
  })
}

const HTMLProcessor = (html) => {
  new Promise(function(resolve, reject) {
    var $ = cheerio.load(html);
    var itemLi = $(".s-result-item");
    var mobileList = [];
    $(itemLi).each(function(i, item) {
      var name,image,price;
      // Name
      name = $(this).find('h2').text();
      // Image
      image = $(this).find('img').attr('src');
      // price
      if ($(this).find('.s-price').text() == '') {
          price = $(this).find('.a-color-price').text()
      } else {
          price = $(this).find('.s-price').text()
      }
      mobileList.push({
          name: name,
          image: image,
          price: price.replace(/\s/g, '')
      });
    });
    var nextPageLink = $('#pagnNextLink').attr('href');
    if (nextPageLink) {
      nextPageLink = 'http://www.amazon.in/' + nextPageLink;
       resolve({list : mobileList, nextPage : nextPageLink});
    }else {
      resolve({list : mobileList, nextPage : undefined});
    }
  });
}
//
// const NextPageTracker = (html) => {
//   let nextPageLink = $('#pagnNextLink').attr('href');
//   if (nextPageLink) {
//     nextPageLink = 'http://www.amazon.in/' + nextPageLink;
//     // Do Somthing
//      scraper(nextPageLink);
//   }else {
//     // Do Somthing
//     scraper();
//   }
// }





// const processHtml = (html) => {
//   return new Promise(function(resolve, reject) {
//     var mobile = [];
//     var $ = cheerio.load(html);
//     var imageList = $(".s-result-item");
//     var productNameList = $('.s-color-twister-title-link');
//     $(imageList).each(function(i, image){
//       var name,image,price;
//       // Name
//       name = $(this).find('h2').text();
//       // Image
//       image = $(this).find('img').attr('src');
//       // price
//       if ($(this).find('.s-price').text() == '') {
//         price = $(this).find('.a-color-price').text()
//       }else {
//         price = $(this).find('.s-price').text()
//       }
//       mobile.push({name : name,image : image,price :price.replace(/\s/g, '') });
//     });
//
//     // var nextPage = 'http://www.amazon.in/' +  $('#pagnNextLink').attr('href');
//     // if ($('#pagnNextLink').attr('href')) {
//     //   console.log(nextPage);
//     //   console.log(mobile);
//     //   ScrapeDao(nextPage).then(e => resolve(e));
//     // }else {
//     //   console.log('Done');
//     //   resolve(mobile);
//     // }
//     resolve(mobile);
//
//     // $('._3BTv9X').find('img');
//     // (function(){
//     //   var data = $(this);
//     //   console.log(data.toArray());
//     // })
//     // console.log($('._2-gKeQ').find('img')[0].attr('src'));
//     // $('._2-gKeQ').each(function(i, elem) {
//     //   console.log(elem);
//     //   mobile.images[i] = elem
//     //   // fruits[i] = $(this).text();
//     // });
//
//
//   });


module.exports = ScrapeDao;
