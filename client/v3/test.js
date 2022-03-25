
const fetchProducts = async (page = 1, limit = 10,brand ='none',price=100) => {
    try {
      const response = []
      if( brand!='none'){
           response = await fetch(
          `https://server-chi-ruddy.vercel.app/products/search?page=${page}&limit=${limit}&brand=${brand}&price=${price}`
        );
      }
      else{ response = await fetch(
        `https://server-chi-ruddy.vercel.app/products/search?page=${page}&limit=${limit}&price=${price}`
      );}
      
      const body = await response.json();
      if (body.success !== true) {
        console.error(body);
        return 0;
      }
      return body.data;
    } catch (error) {
      console.error(error);
      return 0;
    }
  };
  fetchProducts(page = 1, limit = 10,brand ='none',price=100)