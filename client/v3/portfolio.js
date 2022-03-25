// Invoking strict mode https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode#invoking_strict_mode
'use strict';
let favoriteP = []
let currentProducts = [];
let currentPagination = {};
const sectionProducts = document.querySelector('.porductlist');

const selectShow = document.querySelector('#show-select');
const selectPage = document.querySelector('#page-select');
const selectBrand = document.querySelector('#brand-select');
const selectSort = document.querySelector('#sort-select');
const selectfilter = document.querySelector('#filter-select');
const filterFavorite = document.querySelector('#favorites');
/**
 * Render list of products
 * @param  {Array} products
 */
 const renderProducts = products => {
  const fragment = document.createDocumentFragment();
  const div = document.createElement('div');
  div.classList.add("row")
  const template = products
    .map(product => {
      return `
      <div class="col-md-6 col-lg-4 col-xl-3">
      <div id="${product._id}" class="single-product">
        <div class="part-1" style="background: url('${product.photo}') no-repeat center;background-size: cover;">
            <ul>
                <li><a onclick="OnFavoriteClick(this)" id=${product._id}><i class="fas fa-heart"></i></a></li>
                <li><a href="${product.link}" target="_blank"><i class="fas fa-plus"></i></a></li>
            </ul>
        </div>
        <div class="part-2">
            <h3 class="product-title">${product.name}</h3>
            <h4 class="product-brand">${product.brand}</h4>
            <h5 class="product-price">${product.price} €</h5>
        </div>
    </div>
    </div>
    `;
    })
    .join('');
  
  div.innerHTML = template;
  sectionProducts.innerHTML = ''
  fragment.appendChild(div);
  sectionProducts.appendChild(fragment);
  
};


const render = (products, pagination) => {
  renderProducts(products);
  currentPagination = pagination
};
/**
 * Set global value
 * @param {Array} result - products to display
 * @param {Object} meta - pagination meta info
 */
 const setCurrentProductsPagination = ({limit, size,result,brand}) => {
  currentProducts = result;
  currentPagination = {limit,size,page,brand};
};

const fetchProducts = async (pager = 0, limit =100,price=1000,brand ='none') => {
  try {
    var response = []
    if( brand!='none'){
      console.log(`https://server-chi-ruddy.vercel.app/products/search?page=${pager}&limit=${limit}&brand=${brand}&price=${price}`)
         response = await fetch(
        `https://server-chi-ruddy.vercel.app/products/search?page=${pager}&limit=${limit}&brand=${brand}&price=${price}`
      );
    }
    else{ response = await fetch(
      `https://server-chi-ruddy.vercel.app/products/search?page=${pager}&limit=${limit}&price=${price}`
    );}    
    console.log(response)
    const body = await response.json();
    console.log(body)
    return body;
  } catch (error) {
    console.error(error);
    return {currentProducts, currentPagination};
  }
};


document.addEventListener('DOMContentLoaded', async () => {
  const products = await fetchProducts(0,12,1000,'none');
  currentPagination.page=0
  setCurrentProductsPagination(products);
  render(currentProducts, currentPagination);
});


/**
 * Select the number of products to display
 */
 selectShow.addEventListener('change', async (event) => {
  const products = await fetchProducts(currentPagination.page, parseInt(event.target.value),currentPagination.price,currentPagination.brand);
  currentPagination.size=parseInt(event.target.value)
  setCurrentProductsPagination(products);
  render(currentProducts, currentPagination);
});
selectPage.addEventListener('change',async (event) =>{
  const products = await fetchProducts(parseInt(event.target.value),currentPagination.size,currentPagination.price,currentPagination.brand);
  currentPagination.page=parseInt(event.target.value)
  setCurrentProductsPagination(products);
  render(currentProducts, currentPagination);

})


selectBrand.addEventListener('change', async (event) => {
  const products = await fetchProducts(currentPagination.page, currentPagination.size,currentPagination.price,event.target.value)
  setCurrentProductsPagination(products);
  currentPagination.brand = event.target.value
  render(currentProducts, currentPagination);
});

selectfilter.addEventListener('change', async (event) => {
  if(event.target.value == 'reasonableP'){
    var filter_function = (a) => {return (a.price<=50)};
    const currentProductscp = [...currentProducts];
    var filterPrice = currentProductscp.filter(filter_function);
    render(filterPrice, currentPagination);
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
  else {
    render(currentProducts, currentPagination);
  }
});
function filterByFavorite(usedList){
  return usedList.filter(obj => obj.favorite == true);
}

filterFavorite.onchange = function() {
  if(filterFavorite.checked) {
    var currentProductsfav = filterByFavorite(favoriteP);
    render(currentProductsfav, currentPagination);
  } 
  else{
    render(currentProducts, currentPagination);
  }
};
function OnFavoriteClick(elmt){
  console.log(elmt)
  var uuidFavorite = elmt.id
  var productFav = currentProducts.find(obj => obj._id === uuidFavorite);
  console.log(productFav)
  productFav['favorite'] =true
  var b = true
  for (let i = 0; i < favoriteP.length; i++){
    if(favoriteP[i]._id === productFav._id){
      productFav.favorite = false
      favoriteP.splice(i, 1)
      b = false
      break;
    }
  }
  if(b==true){
    favoriteP.push(productFav)
  }
  render(currentProducts, currentPagination);
}