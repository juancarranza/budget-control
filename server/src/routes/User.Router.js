import  express  from "express";
import { login, register, testlogin } from "../controllers/User.Controller.js";

const userRouter = express.Router();

userRouter.post('/user/register', register);
userRouter.post('/user/login', login);
userRouter.post('/v1/user', testlogin);
// userRouter.post('/v1/user', (request, response) =>{
//     console.log(request.body);
//     console.log("here llego");
// });

export default userRouter;