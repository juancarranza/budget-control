import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());
//parser x-www-form-urlencoded
app.use(express.urlencoded({extended: false}));

export default app;