import fs from "fs";

export class CartManager {
  constructor(savePath) {
    this.carts = [];
    this.savePath = savePath;
  }

  _generateId = (cart) => {
    this.carts.length === 0
      ? (cart.id = 1)
      : (cart.id = this.carts[this.carts.length - 1].id + 1);
  };

  createCart = (products = []) => {
    let cart = {
      timestamp: Date.now(),
      products: products,
    };
    this._generateId(cart);
    this.carts.push(cart);
    fs.promises.writeFile(this.savePath, `${JSON.stringify(this.carts)}`);
    return cart;
  };

  getCartById = (id) => {
    const cart = this.carts.find((cart) => cart.id === id);
    if (!cart) {
      console.log(`No existe el carrito con id ${id}`);
      return;
    }
    return cart;
  };

  addProduct = (id, product) => {
    const cart = this.getCartById(id);
    if (!cart) {
      throw new Error(`No existe el carrito con id ${id}`);
    }
    if (!product) {
      throw new Error(`No se especifico el producto`);
    }
    const productInCart = cart.products.find(
      (productInCart) => productInCart.id === product.id
    );
    if (productInCart) {
      product.quantity++;
    } else {
      product.quantity = 1;
    }
    cart.products.push(product);
  };
}
