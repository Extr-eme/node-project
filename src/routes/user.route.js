import { Router } from "express";
import { allUserController, getUserProfile, userLoginController, writeUser} from "../controllers/user.controller.js";
import { authMiddleWare } from "../middleware/authMiddleware.js";


const userRouter=Router()
userRouter.post("/login",userLoginController)
userRouter.post("/getAllusers",allUserController)
userRouter.post("/register",writeUser)
userRouter.get("/:userId",authMiddleWare,getUserProfile)

export default userRouter
