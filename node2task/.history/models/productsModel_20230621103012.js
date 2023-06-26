import { object, string, number, array } from 'zod';

let products = [];
const schema1 = object({
  title: string(),
  price: number(),
  description: string(),
  categoryId: number(),
  images: array(string().url())
});
const schema2 = object({
  title: string(),
  price: number(),
  
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

  validate1(product) {
    return schema1.parse(product);
  },

  validate2(product) {
    return schema2.validate(product);
  }
};
