const Response = require('../helpers/response');
const {UpdateAllLaptops} = require('../daos/laptopsDao');

const UpdateLaptops = (req,res) => {
  UpdateAllLaptops()
  .then(x => res.send(Response(true,'Success',x,[])))
  .catch(e => res.send(Response(false,'Error',{},e)))
}

module.exports = {UpdateLaptops};
