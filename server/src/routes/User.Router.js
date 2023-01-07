import  express  from "express";
import { register } from "../controllers/User.Controller.js";

const userRouter = express.Router();

userRouter.post('/user/register', register);

export default userRouter;