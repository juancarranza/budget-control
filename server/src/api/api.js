import express from "express";
import cors from "cors";
import productRouter from "../routes/Product.Router.js";

const app = express();

app.use(cors());
app.use(express.json());
//parser x-www-form-urlencoded
app.use(express.urlencoded({extended: false}));

//url base de mi api
app.use('/api/budget-control', productRouter);

export default app;