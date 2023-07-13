import fs from "fs";

export class ProductManager {
  constructor(savepath) {
    this.products = [];
    this.savePath = savepath;
  }

  _checkCode = (code) => {
    const codeFound = this.products.findIndex(
      (product) => product.code === code
    );
    if (codeFound != -1) {
      console.log(`El codigo ${code} ya esta registrado`);
      throw new Error(`El codigo ${code} ya esta registrado`);
    }
  };

  _generateId = (product) => {
    this.products.length === 0
      ? (product.id = 1)
      : (product.id = this.products[this.products.length - 1].id + 1);
  };

  getProducts = async () => {
    try {
      const res = await fs.promises.readFile(this.savePath, "utf-8");
      return JSON.parse(res);
    } catch (error) {
      console.log(error);
    }
  };

  getProductById = (id) => {
    const product = this.products.find((product) => product.id === id);
    if (!product) {
      console.log(`No existe el producto con id ${id}`);
      return;
    }
    return product;
  };

  addProduct = (
    title,
    description,
    code,
    price,
    status = true,
    stock,
    category,
    thumbnails = []
  ) => {
    if (!title || !description || !code || !price || !stock || !category) {
      throw new Error(`Faltan datos en el producto ${title}`);
    }
    let product = {
      title,
      description,
      code,
      price,
      status,
      stock,
      category,
      thumbnails,
    };
    if (this._checkCode(code)) {
      throw new Error(`El codigo ${code} ya esta registrado`);
    }
    this._generateId(product);
    this.products.push(product);
    fs.promises.writeFile(this.savePath, `${JSON.stringify(this.products)}`);
  };

  deleteProduct = (id) => {
    const product = this.getProductById(id);
    if (!product) {
      console.log(`No existe el producto con id ${id}`);
      return;
    }
    const index = this.products.findIndex((product) => product.id === id);
    this.products.splice(index, 1);
  };
}
