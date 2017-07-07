const mongojs = require('mongojs');
const DBURL = require('../constants/database');
const db = mongojs(DBURL, ['shoes'])

const InsertMultitpleShoes = (list) => {
  return new Promise(function(resolve, reject) {
    db.shoes.insert(list,function (err,res) {
      if (!err) {
        resolve(res);
      }else {
        console.log(err);
      }
    })
  });
}

module.exports = {InsertMultitpleShoes};
