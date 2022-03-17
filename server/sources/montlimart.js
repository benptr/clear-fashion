const fetch = require('node-fetch');
const cheerio = require('cheerio');
const {'v5': uuidv5} = require('uuid');
/**
 * Parse webpage e-shop
 * @param  {String} data - html response
 * @return {Array} products
 */
const parse = data => {
  const $ = cheerio.load(data);


  return $('.product-info')
  .map((i, element) => {
    const name = $(element)
    .find('.product-name')
    .text()
    .trim()
    .replace(/\s/g, '-');
    const link = $('.product-image')
    .find(' .actions a')
    .attr('href');
    return {
      link,
      'brand': 'montlimart',
      'price': parseInt(
        $(element)
          .find('.price')
          .text()
      ),
      'name': $(element)
        .find('.product-name')
        .text()
        .trim()
        .replace(/\s/g, ' '),
      'photo': $('.product-image')
        .find('img')
        .attr('src'),
      '_id': uuidv5(link, uuidv5.URL)
    };
  })
  .get();
};

/**
 * Scrape all the products for a given url page
 * @param  {[type]}  url
 * @return {Array|null}
 */
module.exports.scrape = async url => {
  try {
    const response = await fetch(url);

    if (response.ok) {
      const body = await response.text();

      return parse(body);
    }

    console.error(response);

    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
};