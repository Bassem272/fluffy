import z from 'zod'


let products = [];
const schema = z.object({
  title: z.string(),
  price: z.number(),
  description: z.string(),
  categoryId:z.number(),
  images: z.array(z.string().url())
})
const schema1 = z.object({
  title: z.string(),
  price: z.number(),
  description: z.string(),
  categoryId:z.number(),
  
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
  return schema1.validate (product)
 },




};