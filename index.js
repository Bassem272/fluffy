const fetch= require('node-fetch');
// import fetch from 'node-fetch';

const fs = require('fs')
fetch('https://api.escuelajs.co/api/v1/products')
      .then(response => response.json())
      .then( products => {

             
  const categorizedProducts = {};
  
  products.forEach(product => {
    const categoryId = product.category.id;
    if (!categorizedProducts[categoryId]) {
      categorizedProducts[categoryId] = [];
    }
    categorizedProducts[categoryId].push(product);
  });
fs.writeFile('./we.json',JSON.stringify(categorizedProducts), err => {

      if (err){
            console.log(err)
      }else{
            console.log('susseccful operationa')
      }
})
    }).catch(error => console.log(error));;
 // writeFile('./we.txt',JSON.stringify(categorizedProducts))
//   fs.writeOutput=writeOutput('./we.txt', JSON.stringify(categorizedProducts))
//  // writeOutput('./we.json', JSON.stringify(categorizedProducts))
//   console.log(categorizedProducts); 

 
     // console.log(sortId); 

     