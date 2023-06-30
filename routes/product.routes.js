import { Router } from "express";
import {
  getProducts,
  getProductById,
  addProduct,
  deleteProduct,
} from "../controllers/products.controller.js";

const router = Router();

router.get("/products", getProducts);
router.get("/products/:id", getProductById);
router.post("/add-product", addProduct);
router.delete("/delete-product/:id", deleteProduct);

export default router;
