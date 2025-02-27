
const fs = require('fs');
const {MongoClient} = require('mongodb');
const MONGODB_URI = 'mongodb+srv://user:JoOZom2cEFLqHMAu@clearfashionben-cluster.m7jps.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
const MONGODB_DB_NAME = 'clearfashion';
const MONGODB_COLLECTION = 'products';

let client = null;
let database = null;

/**
 * Get db connection
 * @type {MongoClient}
 */
const connection = module.exports.connection = async () => {
  try {
    if (database) {
      console.log('💽  Already Connected');
      return database;
    }

    client = await MongoClient.connect(MONGODB_URI, {'useNewUrlParser': true});
    database = client.db(MONGODB_DB_NAME);

    console.log('💽  Connected');

    return database;
  } catch (error) {
    console.error('🚨 MongoClient.connect...', error);
    return null;
  }
};

/**
 * Insert list of products
 * @param  {Array}  products
 * @return {Object}
 */
 module.exports.insert = async products => {
    try {
      const db = await connection();
      const collection = db.collection(MONGODB_COLLECTION);
      const result = await collection.insertMany(products, {'ordered': false});
  
      return result;
    } catch (error) {
      console.error('🚨 collection.insertMany...', error);
      fs.writeFileSync('products.json', JSON.stringify(products));
      return {
        'insertedCount': error.result.nInserted
      };
    }
  };
  
  /**
   * Find products based on query
   * @param  {Array}  query
   * @return {Array}
   */
  module.exports.find = async query => {
    try {
      const db = await connection();
      const collection = db.collection(MONGODB_COLLECTION);
      const result = await collection.find(query).toArray();
      return result;
    } catch (error) {
      console.error('🚨 collection.find...', error);
      return null;
    }
  };
  
  /**
   * Close the connection
   */
  module.exports.close = async () => {
    try {
      await client.close();
    } catch (error) {
      console.error('🚨 MongoClient.close...', error);
    }
  };