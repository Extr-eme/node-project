import { Router } from "express";
import { allUserController, userLoginController, writeUser} from "./controllers/user.controller.js";

const userRouter=Router()
userRouter.post("/login",userLoginController)
userRouter.post("/getAllusers",allUserController)
userRouter.get("/new",writeUser)
export default userRouter

