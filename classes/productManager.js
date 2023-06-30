import fs from "fs";
export class productManager {
  constructor(savePath) {
    this.products = [];
    this.savePath = savePath;
  }

  getProducts = async () => {
    try {
      let response = await fs.promises.readFile(this.savePath, "utf-8");
      return JSON.parse(response);
    } catch (error) {
      console.log(error);
    }
  };

  registeredCode = (productCode) => {
    const registeredCode = this.products.findIndex(
      (product) => product.code === productCode
    );
    if (registeredCode != -1) {
      console.log(`El codigo ${productCode} ya esta registrado`);
      return;
    }
  };

  addProduct = (title, description, price, thumbnail, code, stock) => {
    if (!title || !description || !price || !thumbnail || !code || !stock) {
      console.log(`Faltan datos en el producto ${title}`);
      return;
    }
    let product = {
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    };
    this.registeredCode(code);
    if (this.products.length === 0) {
      product.id = 1;
    } else {
      product.id = this.products[this.products.length - 1].id + 1;
    }
    this.products.push(product);
    fs.promises.writeFile(this.savePath, `${JSON.stringify(this.products)}`);
  };

  getProductById(idProduct) {
    let product = this.products.find((product) => product.id === idProduct);
    if (!product) {
      console.log(`No existe el producto con id ${idProduct}`);
      return;
    }
    return product;
  }

  deleteProduct(idProduct) {
    let product = this.products.find((product) => product.id === idProduct);
    if (!product) {
      console.log(`No existe el producto con id ${idProduct}`);
      return;
    }
  }
}

// const productTester = new productManager("./products.json");
// productTester.addProduct(
//   "Endulzante",
//   "Endulzante sabor caramelo en presentacion de 100ml",
//   70000,
//   "Sin imagen",
//   1123,
//   10
// );
// productTester.addProduct(
//   "Cafe fuerte",
//   "Cafe fuerte marca Monte Verde, 500g",
//   57000,
//   "Sin imagen",
//   1124,
//   14
// );
// productTester.addProduct(
//   "Cafe suave",
//   "Cafe suave marca Manban, 500g",
//   50000,
//   "Sin imagen",
//   1125,
//   9
// );
// console.log(productTester.getProducts());
