import { object, string, number, array } from "zod";
import fs from "fs/promises";
import jwt from "jsonwebtoken";
import groupBy from "array-group";
import json from "body-parser";

// Write output to a file
const schemaRegister = object({
  email: string().email(),
  password: string()
    .min(8)
    .regex(/[A-Z]/)
    .regex(/[a-z]/)
    .regex(/[0-9]/)
    .regex(/[^A-Za-z0-9]/),
  passwordRepeat: string()
    .min(8)
    .regex(/[A-Z]/)
    .regex(/[a-z]/)
    .regex(/[0-9]/)
    .regex(/[^A-Za-z0-9]/),
});
const schemaLogin = object({
  email: string().email(),
  password: string()
    .min(8)
    .regex(/[A-Z]/)
    .regex(/[a-z]/)
    .regex(/[0-9]/)
    .regex(/[^A-Za-z0-9]/),
});
const schemaCategory = object({
  name: string().min(8),
});

let products = [];

let categoriesarr = [];

// {
//   "name": "string",
//   "price": "number",
//   "category_id": "number"
// }
// Validation:

// name: string with at least 3 characters
// price: Number
// category_id: Must be an existing in categories
const schemaProduct = object({
  title: string().min(3),
  price: number(),
  category_id: number(),
});
const schema2 = object({
  title: string(),
  price: number(),
});

export default {
  authenticateToken(req, res, next) {
    // Get JWT token from request header
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];

    // If token is not provided, return unauthorized response
    if (!token) {
      return res.status(401).json({ message: "Token not provided" });
    }
    var decoded = jwt.verify(token, "shhhhh");
    console.log(decoded.iat, "authenticated token");
    // Verify token and extract username
    //   jwt.verify(token, secretKey, (error, decoded) => {
    //     if (error) {
    //       return res.status(403).json({ message: 'Invalid token' });
    //     }
    //     req.username = decoded.username;
    next();
  },
  generalAuthorization(req, res, next) {
    const role = req.headers.role;
    console.log(role, "role");
    if (role === "user" || role === 'admin') {
      next();
    } else {
      return res.status(401).json({ message: "Unauthorized" });
    }
  },
  adminAuthorization(req, res, next) {
    const role = req.headers["role"];
    console.log(role);
    if (role === "admin") {
      next();
    } else {
      return res.status(401).json({ message: "Unauthorized" });
    }
  },

  async validRegister(user) {
    return await schemaRegister.parse(user);
  },
  async validLogin(user) {
    return await schemaLogin.parse(user);
  },

  async validCategory(user) {
    return await schemaCategory.parse(user);
  },
  async validLogin(user) {
    return await schemaLogin.parse(user);
  },
  async saveUsers(users) {
    await fs.writeFile("users.json", JSON.stringify(users));
  },
  async getUsers() {
    const users = await fs.readFile("users.json");
    return JSON.parse(users);
  },
  async correctUser(user, token) {
    const { email, password } = await user;
    const dataUser = await { email, password, token };
    return dataUser;
  },

  async saveCategories(products) {
    const categoryMap = new Map();
    let categoryId = 0;

    const categorySet = new Set(
      products.map(({ category }) => {
        if (!categoryMap.has(category)) {
          categoryMap.set(category, categoryId);
          categoryId++;
        }

        return JSON.stringify({ name: category, id: categoryId });
      })
    );

    const CategoryArray = [...categorySet].map((category) =>
      JSON.parse(category)
    );

    await fs.writeFile("categories.json", JSON.stringify(CategoryArray));
    return CategoryArray;
  },
  async saveCategories2(products) {
    await fs.writeFile("categories.json", JSON.stringify(products), "utf-8");
    return products;
  },
  async readCategories() {
    const categories = await fs.readFile("categories.json");
    return JSON.parse(categories);
  },
  async getCategory(id) {
    const categories = await fs.readFile("categories.json", "utf-8");
    const category = JSON.parse(categories).find((p) => p.id === id);
    console.log(category);
    return category;
  },

  async updateCategory(id, updatedFields) {
    try {
      // Fetch the updated product data from an external API or source
      const categories = await this.readCategories();
      console.log(categories, "yuit");

      // const product = this.getProductById(id);
      const category = categories.find((p) => p.id === id);
      if (!category) {
        return null;
      }
      console.log("Fetched data:", category.id);
      console.log("Fetched data:", category.name);
      console.log("Fetched data:", updatedFields.name);
      console.log("Fetched data:", updatedFields.id);

      // Update the product fields with the fetched data or use the existing values
      category.name = updatedFields.name || category.name;
      // product.price = updatedFields.price || category.price;
      category.updatedAt = new Date();
      console.log("Fetched data:", category);
      return category;
    } catch (error) {
      // Handle any errors that occur during the fetch request
      console.error("Error fetching updated category data:", error);
      return null;
    }
  },
  async deleteCategory(id) {
    try {
      id = Number(id);
      console.log(typeof id);
      // Fetch the updated product data from an external API or source
      const categories = await this.readCategories();
      console.log(categories, "full categories");
      const category = await categories.find((p) => p.id === id);
      console.log("deleted category :", category);
      if (!category) {
        return null;
      }

      // const product = this.getProductById(id);
      const index = categories.findIndex((p) => p.id === id);
      // if (!index === -1) {
      //   return null;
      // }
      categories.splice(index, 1);
      console.log("after  delete data:", categories);
      console.log("Fetched data:", category.name);

      // Update the product fields with the fetched data or use the existing values
      // category.name = updatedFields.name || category.name;
      // product.price = updatedFields.price || category.price;
      //  category.updatedAt = new Date();
      console.log("Fetched data:", category);
      return category;
    } catch (error) {
      // Handle any errors that occur during the fetch request
      console.error("Error fetching updated category data:", error);
      return null;
    }
  },
  async addCategory(name) {
    //   const categories = await fs.readFile('categories.json', 'utf-8');
    // JSON.parse(categories);
    const parsedCategories = await this.readCategories();
    const category = {
      name: name,
      id: parsedCategories.length + 1,
    };

    parsedCategories.push(category);

    console.log(parsedCategories, "iiiii");
    return parsedCategories;
  },
  // setProducts(data) {
  //   products = data;
  // },
  // setCategories(data) {
  //   categoriesarr = data;
  // },
  // addProduct(product) {
  //   products.push(product);
  // },

  async readProducts() {
    const products = await fs.readFile("products.json", "utf-8");
    //const products = await fs.readFile('output.json',"utf-8")
    return JSON.parse(products) || [];
  },

  async getProduct(id) {
    const products = await fs.readFile("products.json", "utf-8");
    //const products = await fs.readFile('output.json');
    const product = JSON.parse(products).find((p) => p.id === id);
    console.log(product);
    return product;
  },
   async saveProducts(products) {
    const categories = JSON.parse(await fs.readFile('categories.json', 'utf-8'));    const transProducts = products.map((product) => {
      const category = categories.find((cat) => cat.name === product.category);
      const category_id = category ? category.id : null;
  
      return {
        id: product.id,
        title: product.title,
        price: product.price,
        category_id: category_id,
      };
    });
    console.log('transProducts', "model");
    fs.writeFile("products.json", JSON.stringify(transProducts), "utf-8");
    fs.writeFile("output.json", JSON.stringify(products), "utf-8");
    return transProducts;
  },

  async addProduct(product) {
    //   const categories = await fs.readFile('categories.json', 'utf-8');
    // JSON.parse(categories);
    console.log(product);
    const parsedProducts = await this.readProducts();

    const producto = {
      id: parsedProducts.length + 1,
      title: product.title,
      price: product.price,
      category_id: product.category_id,
    };
    console.log(producto);
    parsedProducts.push(producto);
    //////////
    console.log('parsedProducts', "iiiii");
    return parsedProducts;
  },

  async updateProduct(id, updatedFields) {
    try {
      // Fetch the updated product data from an external API or source
      console.log(id, updatedFields);
      const parsedProducts = await this.readProducts();

      // const product = this.getProductById(id);
      const product = parsedProducts.find((p) => p.id === id);
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
      product.category_id = product.category_id || product.category_id;
      product.updatedAt = new Date();
      console.log("updated:", product);
      // const productUpdated = this.addProduct(product)
      // 
          const productUpdated1= this.saveProducts( parsedProducts)
      console.log( productUpdated1)
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
     
      console.log(id);
      const products = JSON.parse(await fs.readFile('products.json', 'utf-8'));    
      // const product = this.getProductById(id);
      const product = products.find((p) => p.id === id);
      if (!product) {
        return null;
      }
     
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

  validateProduct(product) {
    return schemaProduct.parse(product);
  },

  async checkCategory(id) {
    const categories = await fs.readFile("categories.json", "utf-8");
    const parsedCategories = JSON.parse(categories);
    const category = parsedCategories.find((p) => p.id === id);
    console.log(category);

    if (!category) {
      return false;
    }

    return category.name;
  },

  validate2(product) {
    return schema2.parse(product);
  },
};
// {
//   "id": 1,
//   "title": "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
//   "price": 109.95,
//   "description": "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
//   "category": "men's clothing",
//   "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
//   "rating": {
//       "rate": 3.9,
//       "count": 120
//   }
