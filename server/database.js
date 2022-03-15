require('dotenv').config()
const dedicatedbrand = require('./sources/dedicatedbrand');
const db = require('./dbmanagement');

async function database () {
    try {
      let products = [];
      let pages = [
        'https://www.dedicatedbrand.com/en/men/basics',
        'https://www.dedicatedbrand.com/en/men/sale'
      ];
  
      console.log(`🕵️‍♀️  browsing ${pages.length} pages with for...of`);
  
      // Way 1 with for of: we scrape page by page
      for (let page of pages) {
        console.log(`🕵️‍♀️  scraping ${page}`);
  
        let results = await dedicatedbrand.scrape(page);
  
        console.log(`👕 ${results.length} products found`);
  
        products.push(results);
      }
  
      products = products.flat();
  
      console.log('\n');
  
      console.log(`👕 ${products.length} total of products found`);
  
      console.log('\n');
  
      const result = await db.insert(products);
  
      console.log(`💽  ${result.insertedCount} inserted products`);
  
      console.log('\n');
  
      console.log('💽  Find Loom products only');
  
      const dedicatedOnly = await db.find({'brand': 'dedicated'});
  
      console.log(`👕 ${dedicatedOnly.length} total of products found for Loom`);
      console.log(dedicatedOnly);
  
      db.close();
    } catch (e) {
      console.error(e);
    }
  }
  
  database();