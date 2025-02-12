import {Router} from "express";
import { authMiddleWare } from "../middleware/authMiddleware.js";
import { createPostController, deletePostByIdController, getAllPostsController, getPostByIdController, getPostByUserIdController, updatePostByIdController } from "../controllers/post.controller.js";



const postRouter=Router();
postRouter
    .route("/")
    .get(authMiddleWare, getAllPostsController)
    .post(authMiddleWare, createPostController);

postRouter.get('/',getAllPostsController)
postRouter
    .route("/:postId")
    .get(authMiddleWare, getPostByIdController)
    .delete(authMiddleWare, deletePostByIdController)
    .patch(authMiddleWare, updatePostByIdController)
postRouter
    .route("/user/:userId")
    .get(authMiddleWare, getPostByUserIdController)

export default postRouter;