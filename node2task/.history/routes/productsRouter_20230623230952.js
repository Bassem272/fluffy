import express from "express";
import productController from "../controllers/productsController.js";

const router = express.Router();

router.get("/", productController.getAllProducts);
router.p("/register", productController.registerIn);
router.get("/login", productController.logIn);
router.get("/:id", productController.getProductById);
router.post("/", productController.createProduct);
router.put("/:id", productController.updateProduct);
router.delete("/:id", productController.deleteProduct);

export default router;
