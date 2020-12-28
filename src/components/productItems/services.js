import Axios from 'axios';

const url = 'http://localhost:3000/products';

export function getProducts() {
    // return Axios.get(URL,
    // {
    //   withCredentials: true,
    //   headers: {'Authorization': getToken()}
    // });

    return Axios.get('http://localhost:3000/products');
}


export function saveProduct(item,id){
    const filteredItems = item.filter(function(list) {
        return (list.id === id);
      });
      const list = filteredItems.map((d) => ({
          id : d.id,
          productname: d.productname,
          producturl:d.producturl,
          productimage:d.productimage,
          quantity:d.quantity,
          price:d.price
      }))
        
      var popped = list.pop();

    console.log("values in save product",popped);
    const putUrl = url + '/' + id;
    return Axios.put(putUrl, popped);
}

export function addProduct(items,id){
    console.log("add product details are ", items, id);
  const addList = ( {
    id : id,
    productname: items.productname,
    producturl:items.producturl,
    productimage:items.productimage,
    quantity:items.quantity,
    price:items.price
  })
  console.log("add product details are- after", addList);
    const pushUrl = url;
    return Axios.post(pushUrl, addList);
}

export function deleteProduct(id){
    // const filteredItems = item.filter(function(list) {
    //     return (list.id === id);
    //   });
    //   const list = filteredItems.map((d) => ({
    //       id : d.id,
    //       productname: d.productname,
    //       producturl:d.producturl,
    //       productimage:d.productimage,
    //       quantity:d.quantity,
    //       price:d.price
    //   }))
        
      //var popped = list.pop();

   // console.log("values in save product",popped);
    const putUrl = url + '/' + id;
    return Axios.delete(putUrl);
}
