import express from "express";
import productController from "../controllers/productsController.js";
import productsModel from '../models/productsModel.js'
import jwt from 'jsonwebtoken';
const router = express.Router();

router.post("/register", productController.registerIn);
router.post("/login", productController.logIn);

router.get ("/category",productsModel.authenticateToken, productController.getAllCategories);
router.get("/category/:id",productsModel.authenticateToken, productController.getCategoryById);
router.post ("/category",productsModel.authenticateToken, productController.postCategory);
router.delete("/category/:id",productsModel.authenticateToken, productController.deleteCategory);
router.put("/category/:id",productsModel.authenticateToken, productController.putCategory);

router.get("/products",productsModel.authenticateToken, productController.getAllProducts);
router.get("/products/:id", productsModel.authenticateToken,productsModel.adproductController.getProductById);
router.post("/products",productsModel.authenticateToken, productsModel.adminAuthorization, productController.createProduct);
router.put("/products/:id", productController.updateProduct);
router.delete("/products/:id", productController.deleteProduct);


export default router;