import express from "express";
import { createBankAccount, updateBankAccount, deleteBankAccount, getBankAccounts } from "../controllers/BankAccount.Controller.js";

const bankAccountRouter = express.Router();

bankAccountRouter.post('/bank-account/create', createBankAccount);
bankAccountRouter.put('/bank-account/edit', updateBankAccount);
bankAccountRouter.put('/bank-account/delete', deleteBankAccount);
bankAccountRouter.get('/bank-account', getBankAccounts)

export default bankAccountRouter;