// Invoking strict mode https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode#invoking_strict_mode
'use strict';

console.log('🚀 This is it.');

const MY_FAVORITE_BRANDS = [{
  'name': 'Hopaal',
  'url': 'https://hopaal.com/'
}, {
  'name': 'Loom',
  'url': 'https://www.loom.fr'
}, {
  'name': 'ADRESSE',
  'url': 'https://adresse.paris/'
}];

console.table(MY_FAVORITE_BRANDS);
console.log(MY_FAVORITE_BRANDS[0]);



/**
 * 🌱
 * Let's go with a very very simple first todo
 * Keep pushing
 * 🌱
 */

// 🎯 TODO: The cheapest t-shirt
// 0. I have 3 favorite brands stored in MY_FAVORITE_BRANDS variable
// 1. Create a new variable and assign it the link of the cheapest t-shirt
// I can find on these e-shops
// 2. Log the variable
const cheapest = "https://www.loom.fr/collections/vestiaire-homme/products/le-t-shirt";
console.log(`cheapest tshirt ${cheapest}`);



/**
 * 👕
 * Easy 😁?
 * Now we manipulate the variable `marketplace`
 * `marketplace` is a list of products from several brands e-shops
 * The variable is loaded by the file data.js
 * 👕
 */

// 🎯 TODO: Number of products
// 1. Create a variable and assign it the number of products
// 2. Log the variable
const number_of_product = marketplace.length;
console.log(`number_of_product ${number_of_product}`);

// 🎯 TODO: Brands name
// 1. Create a variable and assign it the list of brands name only
// 2. Log the variable
// 3. Log how many brands we have

var brand_name = marketplace.map( x => x["brand"]);
console.log(`Brand names : ${brand_name}`);
var set_name = [...new Set(brand_name)];
console.log(`Brand names unique : ${set_name}`);

// 🎯 TODO: Sort by price
// 1. Create a function to sort the marketplace products by price
// 2. Create a variable and assign it the list of products by price from lowest to highest
// 3. Log the variable
console.log("sort by Price");
var sortprice = (a,b) => {return parseInt(a.price)-parseInt(b.price)};
const marketplace_sort = [...marketplace];
var OrderPrice = marketplace_sort.sort(sortprice);
console.log(OrderPrice);
// 🎯 TODO: Sort by date
// 1. Create a function to sort the marketplace objects by products date
// 2. Create a variable and assign it the list of products by date from recent to old
// 3. Log the variable
console.log("sort by date");
var sortDate = (a,b) => {return Date.parse(a.date) - Date.parse(b.date)};
const marketplace_sort2 = [...marketplace];
var Orderdate = marketplace_sort2.sort(sortDate);
console.log(Orderdate);
// 🎯 TODO: Filter a specific price range
// 1. Filter the list of products between 50€ and 100€
// 2. Log the list
var filter_function = (a) => {return (a.price >= 50 && a.price<=100)};
var filtered_marketplace = marketplace.filter(filter_function);
console.log("filter price ");
console.log(filtered_marketplace);
// 🎯 TODO: Average price
// 1. Determine the average price of the marketplace
// 2. Log the average
const reducer = (previousValue, currentValue) => previousValue + currentValue;
var price = marketplace.map( x => x["price"]);
var price_average = price.reduce(reducer)/number_of_product;
console.log(`Average price : ${price_average}`);



/**
 * 🏎
 * We are almost done with the `marketplace` variable
 * Keep pushing
 * 🏎
 */

// 🎯 TODO: Products by brands
// 1. Create an object called `brands` to manipulate products by brand name
// The key is the brand name
// The value is the array of products
//
// Example:
// const brands = {
//   'brand-name-1': [{...}, {...}, ..., {...}],
//   'brand-name-2': [{...}, {...}, ..., {...}],
//   ....
//   'brand-name-n': [{...}, {...}, ..., {...}],
// };
//
// 2. Log the variable
// 3. Log the number of products by brands

const brands = {}
var clone = []
marketplace.forEach(x => {
  if(x['brand'] in brands){
    clone = x['brand'];
    delete x['brand'];
    brands[clone].push(x);
  }else{
    clone = x['brand'];
    delete x['brand'];
    brands[clone] = [x]}});

console.log('brands variable')
console.log(brands);
console.log('number of product by brand')
var le = []
for(const elmt in brands){
  le.push(brands[elmt].length)
}
console.log(le)
// 🎯 TODO: Sort by price for each brand
// 1. For each brand, sort the products by price, from highest to lowest
// 2. Log the sort
console.log('sort by price for each brand')
let brand_sort = JSON.parse(JSON.stringify(brands));
//var brand_sort = Object.assign({}, brands);
var sortprice2 = (a,b) => {return parseInt(b.price)-parseInt(a.price)};
for(const elmt in brand_sort){
  brand_sort[elmt].sort(sortprice2);
}
console.log('sort by price for each brand')
console.log(brand_sort);

// 🎯 TODO: Sort by date for each brand
// 1. For each brand, sort the products by date, from old to recent
// 2. Log the sort

console.log('sort by date for each brand')
var sortdate2 = (a,b) => {return Date.parse(a.date) - Date.parse(b.date)};
let brand_sort2 = JSON.parse(JSON.stringify(brands));
for(const elmt in brand_sort2){
  brand_sort2[elmt].sort(sortdate2);
}
console.log(brand_sort2);



/**
 * 💶
 * Let's talk about money now
 * Do some Maths
 * 💶
 */

// 🎯 TODO: Compute the p90 price value
// 1. Compute the p90 price value of each brand
// The p90 value (90th percentile) is the lower value expected to be exceeded in 90% of the products

console.log('Compute the p90 price value')
var p90 = []
var p90_ = []

for(const elmt in brand_sort){
  console.log(brand_sort[elmt][~~(brand_sort[elmt].length*0.90)].price)
}
console.log(p90)



/**
 * 🧥
 * Cool for your effort.
 * It's almost done
 * Now we manipulate the variable `COTELE_PARIS`
 * `COTELE_PARIS` is a list of products from https://coteleparis.com/collections/tous-les-produits-cotele
 * 🧥
 */

const COTELE_PARIS = [
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/la-baseball-cap-gris',
    price: 45,
    name: 'BASEBALL CAP - TAUPE',
    uuid: 'af07d5a4-778d-56ad-b3f5-7001bf7f2b7d',
    released: '2021-01-11'
  },
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/la-chemise-milleraie-navy',
    price: 85,
    name: 'CHEMISE MILLERAIE MIXTE - NAVY',
    uuid: 'd62e3055-1eb2-5c09-b865-9d0438bcf075',
    released: '2020-12-21'
  },
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/la-veste-fuchsia',
    price: 110,
    name: 'VESTE - FUCHSIA',
    uuid: 'da3858a2-95e3-53da-b92c-7f3d535a753d',
    released: '2020-11-17'
  },
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/la-baseball-cap-camel',
    price: 45,
    name: 'BASEBALL CAP - CAMEL',
    uuid: 'b56c6d88-749a-5b4c-b571-e5b5c6483131',
    released: '2020-10-19'
  },
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/la-chemise-milleraie-beige',
    price: 85,
    name: 'CHEMISE MILLERAIE MIXTE - BEIGE',
    uuid: 'f64727eb-215e-5229-b3f9-063b5354700d',
    released: '2021-01-11'
  },
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/la-veste-rouge-vermeil',
    price: 110,
    name: 'VESTE - ROUGE VERMEIL',
    uuid: '4370637a-9e34-5d0f-9631-04d54a838a6e',
    released: '2020-12-21'
  },
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/la-chemise-milleraie-bordeaux',
    price: 85,
    name: 'CHEMISE MILLERAIE MIXTE - BORDEAUX',
    uuid: '93d80d82-3fc3-55dd-a7ef-09a32053e36c',
    released: '2020-12-21'
  },
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/le-bob-dylan-gris',
    price: 45,
    name: 'BOB DYLAN - TAUPE',
    uuid: 'f48810f1-a822-5ee3-b41a-be15e9a97e3f',
    released: '2020-12-21'
  }
]

// 🎯 TODO: New released products
// // 1. Log if we have new products only (true or false)
// // A new product is a product `released` less than 2 weeks ago.

var today = new Date();
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
var new_ = false
for(const elmt in COTELE_PARIS){
  var date2 = new Date(COTELE_PARIS[elmt].released)
  var diff =today-date2
  var days = diff/(1000 * 3600 * 24)
  if(days<15){
    new_ = true
    console.log('we have new product !' )
    break
  }
}
console.log(`we have a new product ? ${new_}` )
// 🎯 TODO: Reasonable price
// // 1. Log if coteleparis is a reasonable price shop (true or false)
// // A reasonable price if all the products are less than 100€
var reasonable = true
for(const elmt in COTELE_PARIS){
  if(COTELE_PARIS[elmt].price > 100){
    reasonable = false
    break
  }
}
console.log(`we have reasonables prices ? ${reasonable}` )

// 🎯 TODO: Find a specific product
// 1. Find the product with the uuid `b56c6d88-749a-5b4c-b571-e5b5c6483131`
// 2. Log the product
var prokey = 0
for(const elmt in COTELE_PARIS){
  if(COTELE_PARIS[elmt].uuid ==`b56c6d88-749a-5b4c-b571-e5b5c6483131`){
    prokey = elmt
  }
}
console.log(COTELE_PARIS[prokey])
// 🎯 TODO: Delete a specific product
// 1. Delete the product with the uuid `b56c6d88-749a-5b4c-b571-e5b5c6483131`
// 2. Log the new list of product
let COTELE_PARIS2 = JSON.parse(JSON.stringify(COTELE_PARIS));

for(const elmt in COTELE_PARIS2){
  if(COTELE_PARIS2[elmt].uuid ==`b56c6d88-749a-5b4c-b571-e5b5c6483131`){
    delete COTELE_PARIS2[elmt]
  }
}
console.log(COTELE_PARIS2)
// 🎯 TODO: Save the favorite product
let blueJacket = {
  'link': 'https://coteleparis.com/collections/tous-les-produits-cotele/products/la-veste-bleu-roi',
  'price': 110,
  'uuid': 'b4b05398-fee0-4b31-90fe-a794d2ccfaaa'
};

// we make a copy of blueJacket to jacket
// and set a new property `favorite` to true
let jacket = blueJacket;

jacket.favorite = true;

// 1. Log `blueJacket` and `jacket` variables
// 2. What do you notice?

console.log(blueJacket)
console.log(jacket)
// changes happened on both
blueJacket = {
  'link': 'https://coteleparis.com/collections/tous-les-produits-cotele/products/la-veste-bleu-roi',
  'price': 110,
  'uuid': 'b4b05398-fee0-4b31-90fe-a794d2ccfaaa'
};

// 3. Update `jacket` property with `favorite` to true WITHOUT changing blueJacket properties
jacket = JSON.parse(JSON.stringify(blueJacket));
jacket.favorite = true;
console.log('new try')
console.log(blueJacket)
console.log(jacket)



/**
 * 🎬
 * The End
 * 🎬
 */

// 🎯 TODO: Save in localStorage
// 1. Save MY_FAVORITE_BRANDS in the localStorage
// 2. log the localStorage
