import express from "express";
import { createCategory, getCategories } from "../controllers/Category.Controller.js";

const categoryRouter = express.Router();

categoryRouter.post('/category/create', createCategory);
categoryRouter.get('/category', getCategories);

export default categoryRouter;