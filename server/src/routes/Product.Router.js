import express from "express";
import { createProduct, getProducto, getAllProductos, deleteOneProduct } from "../controllers/Product.Controller.js";

const productRouter = express.Router();

productRouter.get('/product', getAllProductos);
productRouter.get('/product/:id', getProducto);
productRouter.post('/product/create', createProduct);
productRouter.delete('/product/delete/:id', deleteOneProduct);


export default productRouter;