const db = require('./dbmanagement');

module.exports.findId = async params  => {
    try {
      const loomOnly = await db.find({'_id': 'params.id'});
      console.log('loomonly')
      console.log(loomOnly)
      return loomOnly
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  module.exports.search = async query  => {
    try {
      const loomOnly = await db.find({'brand': 'loom'});
      console.log('loomonly')
      console.log(loomOnly)
      return loomOnly
    } catch (error) {
      console.error(error);
      return null;
    }
  };
