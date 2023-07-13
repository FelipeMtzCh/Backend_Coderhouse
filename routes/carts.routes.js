import { Router } from "express";
import {
  getCart,
  addProduct,
  createCart,
} from "../controllers/carts.controller.js";

const router = Router();

router.post("/carts", createCart);
router.get("/carts/:id", getCart);
router.post("/carts/:id/product", addProduct);
