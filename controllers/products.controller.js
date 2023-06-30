import { manager } from "../instances/manager.js";

export const getProducts = async (req, res) => {
  try {
    res.json(await manager.getProducts());
    res.status(200);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    res.json(await manager.getProductById(id));
    res.status(200);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addProduct = async (req, res) => {
  try {
    const { title, description, price, thumbnail, code, stock } = req.body;
    await manager.addProduct(title, description, price, thumbnail, code, stock);
    res.status(200).json({ message: "Producto agregado" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await manager.deleteProduct(id);
    res.status(200);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
