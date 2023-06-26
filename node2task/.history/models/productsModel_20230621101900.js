import z from 'zod'
[nodemon] restarting due to changes...
[nodemon] starting `node app.js`
file:///F:/fluffy/node2task/models/productsModel.js:6
  title: z.string(),
         ^

ReferenceError: z is not defined
    at file:///F:/fluffy/node2task/models/productsModel.js:6:10
    at ModuleJob.run (node:internal/modules/esm/module_job:194:25)

Node.js v18.16.0
[nodemon] app crashed - waiting for file changes before starting...



let products = [];
const schema1 =z.object({
  title: z.string(),
  price: z.number(),
  description: z.string(),
  categoryId:z.number(),
  images: z.array(z.string().url())
})
const schema2 = zobject({
  title: z.string(),
  price: z.number(),
  
});

export default {
  getProducts() {
    return products;
  },

  setProducts(data) {
    products = data;
  },

  getProductById(id) {
    return products.find(p => p.id === id);
  },

  addProduct(product) {
    products.push(product);
  },

  updateProduct(id, updatedFields) {
    const product = this.getProductById(id);

    if (!product) {
      return null;
    }

    product.title = updatedFields.title || product.title;
    product.price = updatedFields.price || product.price;
    product.updatedAt = new Date();

    return product;
  },

  deleteProduct(id) {
    const index = products.findIndex(p => p.id === id);

    if (index === -1) {
      return null;
    }

    const deletedProduct = products[index];
    products.splice(index, 1);

    return deletedProduct;
  },
 validate1 (product){
  return z.validate(schema1, product)
 },

 validate2(product){
  return z.validate(schema2, product)
 }



};