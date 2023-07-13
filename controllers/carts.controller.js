import { cartManager } from "../instances/manager";

export const getCart = async (req, res) => {
  try {
    res.json(await cartManager.getCartById(req.params.id));
    res.status(200);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = req.body;
    await cartManager.addProduct(id, product);
    res.status(200).json({ message: "Producto agregado" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createCart = async (req, res, products) => {
  try {
    res.json(await cartManager.createCart(products));
    res.status(200);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
