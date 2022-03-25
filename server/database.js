require('dotenv').config()
const dedicatedbrand = require('./sources/dedicatedbrand');
const adresse = require('./sources/adresse');
const loom = require('./sites/loom');
const montlimart = require('./sources/montlimart');


const db = require('./dbmanagement');

async function database () {
    try {
      let products = [];
      let dedicatedbrandpages = [
        'https://www.dedicatedbrand.com/en/men/news',
        'https://www.dedicatedbrand.com/en/men/sale'
      ];
      let adressePage = ['https://adresse.paris/630-toute-la-collection/s-7/taille-l/couleur-bleu']
      let loomPage = ['https://www.loom.fr/collections/vestiaire-homme']
      let montlimartPage = ['https://www.montlimart.com/toute-la-collection.html?col=338&size=136']
      console.log(`🕵️‍♀️  browsing ${dedicatedbrandpages.length} pages with for...of`);
      for (let page of montlimartPage) {
        console.log(`🕵️‍♀️  scraping ${page}`);
  
        let results = await montlimart.scrape(page);
  
        console.log(`👕 ${results.length} products found`);
  
        products.push(results);
      }
      for (let page of dedicatedbrandpages) {
        console.log(`🕵️‍♀️  scraping ${page}`);
  
        let results = await dedicatedbrand.scrape(page);
  
        console.log(`👕 ${results.length} products found`);
  
        products.push(results);
      }
      for (let page of adressePage) {
        console.log(`🕵️‍♀️  scraping ${page}`);
  
        let results = await adresse.scrape(page);
  
        console.log(`👕 ${results.length} products found`);
  
        products.push(results);
      }
      for (let page of loomPage) {
        console.log(`🕵️‍♀️  scraping ${page}`);
  
        let results = await loom.scrape(page);
  
        console.log(`👕 ${results.length} products found`);
  
        products.push(results);
      }
      
      products = products.flat();
  
      console.log(`👕 ${products.length} total of products found`);

  
      const result = await db.insert(products);
  
      console.log(`💽  ${result.insertedCount} inserted products`);
  
      db.close();
    } catch (e) {
      console.error(e);
    }
  }
  
  database();