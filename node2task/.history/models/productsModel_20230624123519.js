import { object, string, number, array } from "zod";
import  fs from 'fs/promises';
import jwt from 'jsonwebtoken';

// Write output to a file
const schemaRegister = object({
  email: string().email(),
  password: string().min(8).regex(/[A-Z]/).regex(/[a-z]/).regex(/[0-9]/).regex(/[^A-Za-z0-9]/),
  passwordRepeat: string().min(8).regex(/[A-Z]/).regex(/[a-z]/).regex(/[0-9]/).regex(/[^A-Za-z0-9]/),
  
})
const schemaLogin= object({
  email: string().email(),
  password: string().min(8).regex(/[A-Z]/).regex(/[a-z]/).regex(/[0-9]/).regex(/[^A-Za-z0-9]/)
  
})
const schemaCategory= object({
  
  name: string().min(8)
  
})

let products = [];

let categories = [];
const schema1 = object({
  title: string(),
  price: number(),
  description: string(),
  categoryId: number(),
  images: array(string().url()),
});
const schema2 = object({
  title: string(),
  price: number(),
});

export default {

  authenticateToken (req, res, next) {
    // Get JWT token from request header
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
  
    // If token is not provided, return unauthorized response
    if (!token) {
      return res.status(401).json({ message: 'Token not provided' });
    }
    var decoded = jwt.verify(token, 'shhhhh');
    console.log(decoded.iat) 
    // Verify token and extract username
  //   jwt.verify(token, secretKey, (error, decoded) => {
  //     if (error) {
  //       return res.status(403).json({ message: 'Invalid token' });
  //     }
  //     req.username = decoded.username;
      next();
    },
  
  async validRegister(user){
    return await schemaRegister.parse(user) ;
  },
  async validLogin(user){
    return await schemaLogin.parse(user) ;
  },

  async validCategory(user){
    return await schemaCategory.parse(user) ;
  },
  async validLogin(user){
    return await schemaLogin.parse(user) ;
  },
  async saveUsers(users){
    await fs.writeFile('users.json', JSON.stringify(users))
  },
  async getUsers(){
    const users = await fs.readFile('users.json')
   return JSON.parse(users)
  },
async correctUser(user,token ){

  const {email, password}= await user;
  const dataUser = await {email, password , token }
return dataUser;
},
  saveProducts() {
    fs.writeFile('output.json',JSON.stringify(products));
    return products;
  },
  saveCategory() {
    fs.writeFile('categories.json',JSON.stringify(categories));
    return categories;
  },
  async readCategories(){
    const products = await fs.readFile('categories.json')
   return JSON.parse(categories)
  },
  async getCategory(id){
    const categories = await fs.readFile('categories.json');
    const category = JSON.parse(categories).find(p => p.id === id);
    console.log(product)
    return product;
  },
  async readProducts(){
    const products = await fs.readFile('output.json')
   return JSON.parse(products)
  },
 async getProduct(id){
  const products = await fs.readFile('output.json');
  const product = JSON.parse(products).find(p => p.id === id);
  console.log(product)
  return product;
},

  setProducts(data) {
    products = data;
  },

  addProduct(product) {
    products.push(product);
  },

  async updateProduct(id, updatedFields) {
    try {
      // Fetch the updated product data from an external API or source
      const response = await fetch(`https://api.escuelajs.co/api/v1/products/`);
      const products = await response.json();

      // const product = this.getProductById(id);
      const product = products.find((p) => p.id === id);
      if (!product) {
        return null;
      }
      console.log("Fetched data:", product);
      console.log("Fetched data:", product.title);
      console.log("Fetched data:", updatedFields.price);
      console.log("Fetched data:", updatedFields.title);

      // Update the product fields with the fetched data or use the existing values
      product.title = updatedFields.title || product.title;
      product.price = updatedFields.price || product.price;
      product.updatedAt = new Date();
      console.log("Fetched data:", product);
      return product;
    } catch (error) {
      // Handle any errors that occur during the fetch request
      console.error("Error fetching updated product data:", error);
      return null;
    }
  },
  async deleteProduct(id) {
    console.log("Fetched data:", id);

    try {
      // Fetch the updated product data from an external API or source
      const response = await fetch(`https://api.escuelajs.co/api/v1/products/`);
      const products = await response.json();
      const product = products.find((p) => p.id === id);
      const index = products.findIndex((p) => p.id === id);
    if (index === -1) {
      return null;
    }
      console.log("Fetched data:", index);
      console.log("Fetched data:", product);

      
      if (!product) {
        return null;
      }
      console.log("before:", products.length);
      const deletedProduct = products[index];
      products.splice(index, 1);
      console.log("Fetched data:", product);
      console.log("after:", products.length);

      return deletedProduct;
    } catch (error) {
      // Handle any errors that occur during the fetch request
      console.error("Error fetching updated product data:", error);
      return null;
    }
  },

  validate1(product) {
    return schema1.parse(product);
  },

  validate2(product) {
    return schema2.parse(product);
  },
};
