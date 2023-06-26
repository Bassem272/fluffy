import express from "express";
import productController from "../controllers/productsController.js";
import productsMod from '../models/productsModel.js'
import jwt from 'jsonwebtoken';
const router = express.Router();

router.get("/products",productsMod.authenticateToken, productController.getAllProducts);
router.post("/register", productController.registerIn);
router.post("/login", productController.logIn);
router.get("/:id", productController.getProductById);
router.post("/", productController.createProduct);
router.put("/:id", productController.updateProduct);
router.delete("/:id", productController.deleteProduct);

export default router;
