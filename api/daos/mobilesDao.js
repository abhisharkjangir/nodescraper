const mongojs = require('mongojs');
const DBURL = require('../constants/database');
const db = mongojs(DBURL, ['mobiles'])

const InsertMultitpleMobiles = (list) => {
  return new Promise(function(resolve, reject) {
    db.mobiles.insert(list,function (err,res) {
      if (!err) {
        resolve(res);
      }else {
        console.log(err);
      }
    })
  });

}

module.exports = {InsertMultitpleMobiles};
