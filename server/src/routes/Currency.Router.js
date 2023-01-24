import express from "express";
import { createCurrency, getCurrencies } from "../controllers/Currency.Controller.js";

const currencyRouter = express.Router();

currencyRouter.post('/currency/create', createCurrency);
currencyRouter.get('/currency', getCurrencies);

export default currencyRouter;