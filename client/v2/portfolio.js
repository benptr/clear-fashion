// Invoking strict mode https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode#invoking_strict_mode
'use strict';

// current products on the page

let currentProducts = [];
let currentPagination = {};
let currentProductsBrand = {};
let currentProductsBrandRes = {};
let favoriteProduct = {};

// instantiate the selectors
const selectShow = document.querySelector('#show-select');
const selectPage = document.querySelector('#page-select');
const sectionProducts = document.querySelector('#products');
const selectBrand = document.querySelector('#brand-select');
const selectSort = document.querySelector('#sort-select');
const selectfilter = document.querySelector('#filter-select');
const filterFavorite = document.querySelector('#favorites');
// instantiate the selectors for insights 
const spanNbProducts = document.querySelector('#nbProducts');
const spannbNewProcucts = document.querySelector('#nbNewProcucts');
const spanP50 = document.querySelector('#p50');
const spanP90= document.querySelector('#p90');
const spanP95 = document.querySelector('#p95');
const spanLastrelease = document.querySelector('#lastRelease')


/**
 * Set global value
 * @param {Array} result - products to display
 * @param {Object} meta - pagination meta info
 */
const setCurrentProducts = ({result, meta}) => {
  currentProducts = result;
  currentPagination = meta;
};

/**
 * Fetch products from api
 * @param  {Number}  [page=1] - current page to fetch
 * @param  {Number}  [size=12] - size of the page
* @param  {String} [brand="none"] - brand filter
 * @return {Object}
 */
const fetchProducts = async (page = 1, size = 12,brand ='none') => {
  try {
    if(brand == 'none'){
      const response = await fetch(
        `https://clear-fashion-api.vercel.app?page=${page}&size=${size}`
      );
      const body = await response.json();
      if (body.success !== true) {
        console.error(body);
        return {currentProducts, currentPagination};
      }
      return body.data;
    }
    else{
      var filter_function = (a) => {return (a.brand == brand)};
      const body = currentProductsBrand['result'].filter(filter_function)
      return body.slice(0,size);
    }
    
  } catch (error) {
    console.error(error);
    return {currentProducts, currentPagination};
  }
};

const fetchProductsBrand = async (page = 1, size = 1000,brand ='none') => {
  try {
    const response = await fetch(
      `https://clear-fashion-api.vercel.app?page=${page}&size=${size}`
    );
    const body = await response.json();
    if (body.success !== true) {
      console.error(body);
      return {currentProducts, currentPagination};
    }
    return body.data;
  } catch (error) {
    console.error(error);
    return {currentProducts, currentPagination};
  }
};
/**
 * Render list of products
 * @param  {Array} products
 */
const renderProducts = products => {
  const fragment = document.createDocumentFragment();
  const div = document.createElement('div');
  const template = products
    .map(product => {
      var buttonStyle = "background-color:white; border-color:black";
      console.log(product.favorite)
      if (product.favorite){
        buttonStyle = "background-color:yellow; border-color:orange";
      }
      return `
      <div class="product" id=${product.uuid}>
        <span>${product.brand}</span>
        <a href="${product.link}" target="_blank">${product.name}</a>
        <span>${product.price}</span>
        <button uuid="${product.uuid}" onclick="OnFavoriteClick(this)" type="button" ${buttonStyle}}">⭐</button>
      </div>
    `;
    })
    .join('');
  
  
  div.innerHTML = template;

  fragment.appendChild(div);
  sectionProducts.innerHTML = '<h2>Products</h2>';
  sectionProducts.appendChild(fragment);
  
};

/**
 * Render page selector
 * @param  {Object} pagination
 */
const renderPagination = pagination => {
  const {currentPage, pageCount} = pagination;
  const options = Array.from(
    {'length': pageCount},
    (value, index) => `<option value="${index + 1}">${index + 1}</option>`
  ).join('');

  selectPage.innerHTML = options;
  selectPage.selectedIndex = currentPage - 1;
};
/**
 * Render page selector
 * @param  {Object} pagination
 */
  const renderBrand = pagination => {
  const brands_name = [...new Set(currentProductsBrandRes.map(x=>x['brand']))]
  brands_name.unshift("none")
  const options = Array.from(
    brands_name,
     x => `<option value="${x}">${x}</option>`
  ).join('');

  selectBrand.innerHTML = options;
  selectBrand.selectedIndex = "none";
};

/**
 * Render page selector
 * @param  {Object} pagination
 */
const renderIndicators = pagination => {
  const {count} = pagination;
  spanNbProducts.innerHTML = count;

  var today = new Date();
  var filter_function2 = (a) => {
    var diff =today-Date.parse(a.released)
    var days = diff/(1000 * 3600 * 24)
      return (days<=15)
    };
  const currentProductscp = [...currentProductsBrandRes];
  var filterDate = currentProductscp.filter(filter_function2);
  spannbNewProcucts.innerHTML = filterDate.length

  function pX(nombre) {
    var pX = 0
    var sortprice3 = (a,b) => {return parseInt(b.price)-parseInt(a.price)};
    const currentProductscp = [...currentProductsBrandRes];
    var OrderPrice = currentProductscp.sort(sortprice3);
    pX = OrderPrice[~~(OrderPrice.length*(nombre/100))].price
    return pX;
  }

  spanP50.innerHTML = pX(50)
  spanP90.innerHTML = pX(90)
  spanP95.innerHTML = pX(95)

  var sortDate3 = (a,b) => {return Date.parse(b.released) - Date.parse(a.released)};
  const currentProductsBrandRes2 = [...currentProductsBrandRes];
  var Orderdate2 = currentProductsBrandRes2.sort(sortDate3);
  spanLastrelease.innerHTML = Orderdate2[0].released

}

const render = (products, pagination) => {
  renderProducts(products);
  renderPagination(pagination);
  renderIndicators(pagination);
  renderBrand(pagination)
};

/**
 * Declaration of all Listeners
 */

/**
 * Select the number of products to display
 */
selectShow.addEventListener('change', async (event) => {
  const products = await fetchProducts(currentPagination.currentPage, parseInt(event.target.value));
  setCurrentProducts(products);
  render(currentProducts, currentPagination);
});
selectPage.addEventListener('change',async (event) =>{
  currentPagination.currentPage = 1;
  const products = await fetchProducts(parseInt(event.target.value), currentProducts.length);
  setCurrentProducts(products);
  render(currentProducts, currentPagination);

})

document.addEventListener('DOMContentLoaded', async () => {
  currentProductsBrand = await fetchProductsBrand();
  currentProductsBrandRes = currentProductsBrand.result
  currentProductsBrand['result'].map(obj => obj.favorite = false);
  const products = await fetchProducts();
  setCurrentProducts(products);
  render(currentProducts, currentPagination);
});


selectBrand.addEventListener('change', async (event) => {
  const products = await fetchProducts(currentPagination.currentPage, currentProducts.length,event.target.value)
  currentProducts = products
  render(currentProducts, currentPagination);
 

});

selectfilter.addEventListener('change', async (event) => {
  if(event.target.value == 'reasonableP'){
    var filter_function = (a) => {return (a.price<=50)};
    const currentProductscp = [...currentProducts];
    var filterPrice = currentProductscp.filter(filter_function);
    render(filterPrice, currentPagination);
  }
  else if(event.target.value == 'recentlyR'){
    var today = new Date();
    var filter_function2 = (a) => {
      var diff =today-Date.parse(a.released)
      var days = diff/(1000 * 3600 * 24)
      return (days<=15)};
    const currentProductscp = [...currentProducts];
    var filterDate = currentProductscp.filter(filter_function2);
    render(filterDate, currentPagination);
  }
  else {
    render(currentProducts, currentPagination);
  }
});


selectSort.addEventListener('change', async (event) => {
  if(event.target.value == 'price-asc'){
    var sortprice = (a,b) => {return parseInt(a.price)-parseInt(b.price)};
    const currentProductscp = [...currentProducts];
    var OrderPrice = currentProductscp.sort(sortprice);
    render(OrderPrice, currentPagination);
  }
  else if(event.target.value == 'price-desc'){
    var sortprice2 = (a,b) => {return parseInt(b.price)-parseInt(a.price)};
    const currentProductscp = [...currentProducts];
    var OrderPrice = currentProductscp.sort(sortprice2);
    render(OrderPrice, currentPagination);
  }
  else if(event.target.value == 'date-asc'){
    var sortDate = (a,b) => {return Date.parse(a.released) - Date.parse(b.released)};
    const currentProductscp = [...currentProducts];
    var Orderdate = currentProductscp.sort(sortDate);
    render(Orderdate, currentPagination);
  }
  else if(event.target.value == 'date-desc'){
    var sortDate = (a,b) => {return Date.parse(b.released) - Date.parse(a.released)};
    const currentProductscp = [...currentProducts];
    var Orderdate = currentProductscp.sort(sortDate);
    render(Orderdate, currentPagination);
  }
  else {
    render(currentProducts, currentPagination);
  }
});
function filterByFavorite(usedList){
  return usedList.filter(obj => obj.favorite == true);
}
filterFavorite.onchange = function() {
  if(filterFavorite.checked) {
    var currentProductscp = currentProducts;
    if (currentProducts.length == 0){currentProductscp = currentProductsBrand;}
    var currentProductsfav = filterByFavorite(currentProductscp);
    render(currentProductsfav, currentPagination);
  } 
  else{
    render(currentProducts, currentPagination);
  }
};
function OnFavoriteClick(elmt){
  var uuidFavorite = elmt.uuid
  console.log(currentProductsBrand)
  var productFav = currentProductsBrand['result'].find(obj => obj.uuid == uuidFavorite);
  productFav.favorite = !productFav.favorite;
  render(currentProducts, currentPagination);
}