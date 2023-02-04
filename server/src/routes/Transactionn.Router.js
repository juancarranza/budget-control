import express from "express";
import { getTransactions, createTransaction, updateTransaction, deleteTransaction } from "../controllers/Transactionn.Controller.js";

const transactionnRouter = express.Router();

transactionnRouter.post('/transaction', getTransactions);
transactionnRouter.post('/transaction/create', createTransaction);
transactionnRouter.put('/transaction/update', updateTransaction);
transactionnRouter.put('/transaction/delete', deleteTransaction);

export default transactionnRouter;