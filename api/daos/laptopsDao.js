const mongojs = require('mongojs');
const DBURL = require('../constants/database');
const db = mongojs(DBURL, ['laptops'])

const InsertMultitpleLaptops = (list) => {
  return new Promise(function(resolve, reject) {
    db.laptops.insert(list,function (err,res) {
      if (!err) {
        resolve(res);
      }else {
        console.log(err);
      }
    })
  });
}

module.exports = {InsertMultitpleLaptops};
