import express from "express";
import cors from "cors";
import productRouter from "../routes/Product.Router.js";
import userRouter from "../routes/User.Router.js";
import categoryRouter from "../routes/Category.Router.js";
import currencyRouter from "../routes/Currency.Router.js";
import bankAccountRouter from "../routes/BankAccount.Router.js";
import transferRouter from "../routes/Transfer.Router.js";

const app = express();

app.use(cors());
app.use(express.json());
//parser x-www-form-urlencoded
app.use(express.urlencoded({extended: false}));

//url base de mi api
app.use('/api/budget-control', productRouter, userRouter, categoryRouter, currencyRouter, bankAccountRouter, transferRouter);

export default app;