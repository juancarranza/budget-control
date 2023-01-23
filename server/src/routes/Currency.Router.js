import express from "express";
import { createCurrency } from "../controllers/Currency.Controller.js";

const currencyRouter = express.Router();

currencyRouter.post('/currency/create', createCurrency);

export default currencyRouter;