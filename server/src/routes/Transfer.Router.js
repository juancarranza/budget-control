import express from "express";
import { createTransfer, createTransfer_HOLA } from "../controllers/Transfer.Controller.js";

const transferRouter = express.Router();

transferRouter.post('/transfer/create', createTransfer);
transferRouter.post('/transfer/hola', createTransfer_HOLA);

export default transferRouter;