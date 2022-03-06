/* eslint-disable no-console, no-process-exit */
const montlimartbrand = require('./montlimart');
var listProduct = []
async function getMontlimart (eshop = 'https://www.montlimart.com/toute-la-collection.html?col=338&size=136') {
  try {
    console.log(`🕵️‍♀️  browsing ${eshop} source`);

    const products = await montlimartbrand.scrape(eshop);

    console.log(products);
    console.log('done');
    listProduct = products
    return listProduct
  } catch (e) {
    console.error(e);

  }
}

const [,, eshop] = process.argv;

getMontlimart(eshop);