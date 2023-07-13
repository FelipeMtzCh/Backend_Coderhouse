import { ProductManager } from "../classes/ProductManager.js";
import { CartManager } from "../classes/CartManager.js";

export const cartManager = new CartManager("./data/carts.json");
export const manager = new ProductManager("./data/products.json");
