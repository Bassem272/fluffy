let products = [];

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
  }
};
const schema = z.object({
  title: 
})
