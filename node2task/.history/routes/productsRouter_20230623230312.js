import express from "express";
import productController from "../controllers/productsController.js";

const router = express.Router();

router.get("/", productController.getAllProducts);
router.get("/register", productController.registerIN);
router.get("/login", productController.logn);
router.get("/:id", productController.getProductById);
router.post("/", productController.createProduct);
router.put("/:id", productController.updateProduct);
router.delete("/:id", productController.deleteProduct);

export default router;
