const mongojs = require('mongojs');
const DBURL = require('../constants/database');
const db = mongojs(DBURL, ['laptops'])

const InsertMultitpleMovies = (list) => {
  return new Promise(function(resolve, reject) {
    db.movies.insert(list,function (err,res) {
      if (!err) {
        resolve(res);
      }else {
        console.log(err);
      }
    })
  });
}

module.exports = {InsertMultitpleMovies};
