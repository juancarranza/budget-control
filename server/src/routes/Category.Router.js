import express from "express";
import { createCategory, getCategories, updateCategory, deleteCategory } from "../controllers/Category.Controller.js";

const categoryRouter = express.Router();

categoryRouter.post('/category/create', createCategory);
categoryRouter.put('/category/update', updateCategory);
categoryRouter.put('/category/delete', deleteCategory);
categoryRouter.get('/category', getCategories);

export default categoryRouter;