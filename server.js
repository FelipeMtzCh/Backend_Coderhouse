import express from "express";
import productRoutes from "./routes/product.routes.js";

const app = express();

app.use(express.json());
app.use("/api", productRoutes);
app.get("/", (req, res) => {
  res.send("Bienvenido a la tienda de productos");
});

export default app;
