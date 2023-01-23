import express from "express";
import { createCategory } from "../controllers/Category.Controller.js";

const categoryRouter = express.Router();

categoryRouter.post('/category/create', createCategory);

export default categoryRouter;