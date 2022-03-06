/* eslint-disable no-console, no-process-exit */
const adressebrand = require('./adresse');
var listProduct = []
async function getAdresse (eshop = 'https://adresse.paris/630-toute-la-collection/s-7/taille-l/couleur-bleu/categories_2-toutes_les_pieces') {
  try {
    console.log(`🕵️‍♀️  browsing ${eshop} source`);

    const products = await adressebrand.scrape(eshop);

    console.log(products);
    console.log('done');
    listProduct = products
    return listProduct
  } catch (e) {
    console.error(e);
  }
}

const [,, eshop] = process.argv;

getAdresse(eshop);