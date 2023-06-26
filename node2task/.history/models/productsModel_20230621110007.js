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

  async updateProduct(id, updatedFields) {
    const product = this.getProductById(id);
  
    if (!product) {
      return null;
    }
  
    try {
      // Fetch the updated product data from an external API or source
      const response = await fetch(`https://example.com/products/${id}`);
      const updatedData = await response.json();
  
      console.log('Fetched data:', updatedData);
  
      // Update the product fields with the fetched data or use the existing values
      product.title = updatedData.title || updatedFields.title || product.title;
      product.price = updatedData.price || updatedFields.price || product.price;
      product.updatedAt = new Date();
  
      return product;
    } catch (error) {
      // Handle any errors that occur during the fetch request
      console.error('Error fetching updated product data:', error);
      return null;
    }
  }
  .
  

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
    return schema2.parse(product);
  }
};
