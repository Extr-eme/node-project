import { Router } from "express";
import { allUserController, userLoginController, writeUser} from "./controllers/user.controller.js";
import { authMiddleWare } from "./middleware/authMiddleware.js";

const userRouter=Router()
userRouter.post("/login",userLoginController)
userRouter.post("/getAllusers",allUserController)
userRouter.get("/new",writeUser)
userRouter.get("/:userId",authMiddleWare)
export default userRouter

