import  express  from "express";
import { login, register } from "../controllers/User.Controller.js";

const userRouter = express.Router();

userRouter.post('/user/register', register);
userRouter.post('/user/login', login)

export default userRouter;