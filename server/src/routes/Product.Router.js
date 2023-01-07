import express from "express";
import { createProduct, getProductos } from "../controllers/Product.Controller.js";

export const productRouter = express.Router();
const allProductsRouter = express.Router();

productRouter.post('/product/create', createProduct);

allProductsRouter.get('/product', getProductos);

export default allProductsRouter;