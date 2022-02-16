// Invoking strict mode https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode#invoking_strict_mode
'use strict';

// current products on the page

let currentProducts = [];
let currentPagination = {};
let currentProductsBrand = {};
let currentProductsBrandRes = {};

// instantiate the selectors
const selectShow = document.querySelector('#show-select');
const selectPage = document.querySelector('#page-select');
const sectionProducts = document.querySelector('#products');
const spanNbProducts = document.querySelector('#nbProducts');
const selectBrand = document.querySelector('#brand-select');
const selectSort = document.querySelector('#sort-select')

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
      return `
      <div class="product" id=${product.uuid}>
        <span>${product.brand}</span>
        <a href="${product.link}">${product.name}</a>
        <span>${product.price}</span>
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
};

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
  console.log(currentProductsBrand)
  const products = await fetchProducts();
  setCurrentProducts(products);
  render(currentProducts, currentPagination);
});


selectBrand.addEventListener('change', async (event) => {
  const products = await fetchProducts(currentPagination.currentPage, currentProducts.length,event.target.value)
  currentProducts = products
  render(currentProducts, currentPagination);
 

});

selectSort.addEventListener('change', async (event) => {
  console.log(currentProducts)
  console.log('target')
  console.log(event.target.value)
  if(event.target.value == 'price-asc'){
    console.log("sort by Price");
    var sortprice = (a,b) => {return parseInt(a.price)-parseInt(b.price)};
    const currentProductscp = [...currentProducts];
    var OrderPrice = currentProductscp.sort(sortprice);
    render(OrderPrice, currentPagination);
  }
  else {
    render(currentProducts, currentPagination);
  }

 

});