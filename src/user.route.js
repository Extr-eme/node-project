import { Router } from "express";
import { userLoginController } from "./controllers/user.controller.js";

const userRouter=Router()
userRouter.post("/login",userLoginController)
userRouter.post("/getAllusers")
export default userRouter

