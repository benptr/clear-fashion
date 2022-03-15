/* eslint-disable no-console, no-process-exit */
const dedicatedbrand = require('./dedicatedbrand');
var listProduct = []
async function getDedicated (eshop = 'https://www.dedicatedbrand.com/en/men/news') {
  try {
    console.log(`🕵️‍♀️  browsing ${eshop} source`);

    const products = await dedicatedbrand.scrape(eshop);
    listProduct = products
    console.log(listProduct);
    console.log('done');
    return listProduct
  } catch (e) {
    console.error(e);
  }
}

const [,, eshop] = process.argv;

getDedicated(eshop);