const Request = require('request-promise');
const cheerio = require('cheerio');
const co = require('co');
const Items = [];
var reqCount = 0;

const IP = (fn) => new Promise((resolve, reject) => {
    try {
        resolve(fn())
    } catch (e) {
        reject(e)
    }
})
const PromiseResolver = (url, datax, thenable) => co(function * () {
    if (!thenable) {
        return IP(() => datax)
    }
    const HTML = yield Request(url);
    var processedData = HTMLProcessor(HTML);
    reqCount = reqCount + 1;

    if (processedData.nextUrl && reqCount <= 1) {
        return PromiseResolver(processedData.nextUrl, processedData.list.concat(datax), true);
    } else {
        return PromiseResolver(null, processedData.list.concat(datax), false);
    }
})

const HTMLProcessor = (html) => {
    var $ = cheerio.load(html);
    var DOMItemList = $(".s-result-item");
    var ItemList = [];
    var nextPageLink = $('#pagnNextLink').attr('href');

    $(DOMItemList).each(function(i, item) {
        var name,
            image,
            price;
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
        ItemList.push({
            name: name,
            image: image,
            price: price.replace(/\s/g, '')
        });
    });

    if (nextPageLink) {
        nextPageLink = 'http://www.amazon.in/' + nextPageLink;
    } else {
        nextPageLink = null;
    }

    return {nextUrl: nextPageLink, list: ItemList};
}

module.exports = PromiseResolver;
