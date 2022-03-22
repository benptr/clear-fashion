const db = require('./dbmanagement');

module.exports.findId = async params  => {
    try {
      const idq = await db.find({'_id': params.id});
      return idq[0]
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  module.exports.search = async query  => {
    try {
      const db1 = await db.connection();
      const MONGODB_COLLECTION = 'products';
      const collection = db1.collection(MONGODB_COLLECTION);
      if (!query.page) {query.page = 1}else{query.page=parseInt(query.page)}
      if (!query.limit) {query.limit = 12}else{query.limit = parseInt(query.limit)}  //Here is the limit default
      if (!query.price) {query.price = 100000}else{query.price=parseInt(query.price)}
      var sorter = {}
      if (query.order == 'price') {sorter.price = 1};
      if (!query.brand){
          filtered = await collection.find({price : {$lt : query.price}}).skip(query.page * query.limit).limit(query.limit).sort(sorter).toArray();;
      }
      else{
          filtered = await collection.find({brand : query.brand, price : {$lt : query.price}}).skip(query.page * query.limit).limit(query.limit).sort(sorter).toArray();;
      }
      console.log(filtered);
      const size = filtered.length
      res = {"limit":query.limit,
              "size":size,
              "result":filtered}
      return res
    } catch (error) {
      console.error(error);
      return null;
    }
  };
