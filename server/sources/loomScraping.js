/* eslint-disable no-console, no-process-exit */
const dedicatedbrand = require('../sites/loom');
var listProduct = []
async function getLoom (eshop = 'https://www.loom.fr/collections/vestiaire-homme') {
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

getLoom(eshop);