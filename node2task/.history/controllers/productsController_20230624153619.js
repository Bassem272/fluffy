import fetch from "node-fetch";
import productsModel from "../models/productsModel.js";
import { object, string, number, array } from "zod";
import fs from "fs/promises";
import jwt from "jsonwebtoken";


export default {
  async registerIn(req, res) {
    try { req.isAuthenticated()
      // Extract username and password from request body
      const { email, password } = req.body;

      // Check if user already exists
      const users = await productsModel.getUsers();
      const result = await productsModel.validRegister(req.body);
      if (!result) {
        return res
          .status(401)
          .json({ message: "Invalid email or password" });
      }
      console.log(result)
      if (users.find((user) => user.email === email)) {
        return res.status(409).json({ message: "User already exists" });
      }

      // Add new user to database
      const newUser = { email, password };
      users.push(newUser);
      await productsModel.saveUsers(users);

      // Return success response
      res.status(201).json({ "success": true });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  async logIn(req, res) {
    try {
      // Extract username and password from request body
      const { email, password } = req.body;

      // Check if user exists and password is correct
      const users = await productsModel.getUsers();
      const result = await productsModel.validLogin(req.body);
      if (!result) {
        return res
          .status(401)
          .json({ message: "Invalid email or password" });
      }
      console.log(result)
      const user = users.find(
        (user) => user.email === email && user.password === password
      );
      console.log(user)
      if (!user) {
        return res
          .status(401)
          .json({ message: "Invalid username or password" });
      }

      // Generate JWT token and send it in the response
      // const token = jwt.sign(user,secretKey);
      //var token = jwt.sign(user, 'shhhhh'), { expiresIn: "1m" }

      const token = jwt.sign(user, "shhhhh");

      res.status(200).json(await productsModel.correctUser(user,token));
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

 
  async getAllProducts(req, res) {
    try {
        

      const response = await fetch("https://fakestoreapi.com/products");
      const products = await response.json();
      productsModel.setProducts(products);
     
      
    
      
     // console.log(products)
      await  productsModel.saveCategories(products)
     console.log( awaaitCategoryArray)
      // fs.writeFile('categories.json',JSON.stringify(CategoryArray))
      // save it to products array in productsModel
      // fs.writeFile('output.json',JSON.stringify(data));
      res.json(productsModel.saveProducts(products));// save the data to output.json file 
    } catch (error) {
      res.status(500).json({ error: "Error fetching products" });
    }
  },
   async  getProductById(req, res) {
    const id = parseInt(req.params.id);
    console.log(id)
    const product = await   productsModel.getProduct(id);

    if (!product) {
      res.status(404).json({ error: "Product not found" });
    } else {
      res.json(product);
    }
  },
   async  getProductById(req, res) {
    const id = parseInt(req.params.id);
    console.log(id)
    const product = await   productsModel.getProduct(id);

    if (!product) {
      res.status(404).json({ error: "Product not found" });
    } else {
      res.json(product);
    }
  },
  createProduct(req, res) {
    try {
      productsModel.validate1(req.body);
    } catch (error) {
      return res.status(400).send({ error: error.message });
    }
    const { title, price, description, categoryId, images } = req.body;

    const newProduct = {
      id: productsModel.readProducts.length + 1,
      title,
      price,
      description,
      category: {
        id: categoryId,
        name: "Clothes",
        image: "https://api.lorem.space/image/fashion?w=640&h=480&r=4278",
        creationAt: new Date(),
        updatedAt: new Date(),
      },
      images,
      creationAt: new Date(),
      updatedAt: new Date(),
    };

    productsModel.addProduct(newProduct);

    res.status(201).json(newProduct);
  },
 postCategory(req, res) {
    try {
      productsModel.validCategory(req.body);
    } catch (error) {
      return res.status(400).send({ error: error.message });
    }
    const { name } = req.body;

    

    //productsModel.addProduct(newProduct);

    res.status(201).json(req.body);
  },
   async putCategory(req, res) {
    try {
      productsModel.validCategory(req.body);
    } catch (error) {
      return res.status(400).send({ error: error.message });
    } const id = parseInt(req.params.id);
    const { name } = req.body;

    const updatedProduct = await productsModel.updateProduct(id, {
      name
    });
    console.log("update :", updatedProduct);
    if (!updatedProduct) {
      res.status(404).json({ error: "Product not found" });
    } else {
      res.json(updatedProduct);
    }
  

    

    //productsModel.addProduct(newProduct);

    res.status(201).json(req.body);
  },
  deleteCategory(req, res) {
    try {
      productsModel.validCategory(req.body);
    } catch (error) {
      return res.status(400).send({ error: error.message });
    }
    const { name } = req.body;

    

    //productsModel.addProduct(newProduct);

    res.status(201).json(req.body);
  },
  async updateProduct(req, res) {
    try {
      productsModel.validate2(req.body);
    } catch (error) {
      return res.status(400).send({ error: error.message });
    }
    const id = parseInt(req.params.id);
    const { title, price } = req.body;

    const updatedProduct = await productsModel.updateProduct(id, {
      title,
      price,
    });
    console.log("update :", updatedProduct);
    if (!updatedProduct) {
      res.status(404).json({ error: "Product not found" });
    } else {
      res.json(updatedProduct);
    }
  },

  async deleteProduct(req, res) {
    const id = parseInt(req.params.id);

    const deletedProduct = await productsModel.deleteProduct(id);

    if (!deletedProduct) {
      res.status(404).json({ error: "Product not found" });
    } else {
      res.json(true);
    }
  },
};
