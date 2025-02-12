import { StatusCodes } from "http-status-codes";
import { createPostService, deletePostByIdService, getAllPostsService, getPostByIdService, getPostByUserIdService, updatePostByIdService } from "../services/post.service.js";
import { createPostSchema, updatePostSchema } from "../schemas/post.schema.js";
export const getAllPostsController=async (req, res, next)=>{
    try {
        const posts = await getAllPostsService(req.query);
        res.status(StatusCodes.OK).json(posts);
    }
    catch(error){
        console.error(error);
        next(error);
    }
}
export const createPostController = async (req, res, next)=>{
    try {
        createPostSchema.parse(req.body);
        
        const data = await createPostService(req.body, req.userId);
        res.status(StatusCodes.OK).json(data);
    } catch (error) {
        console.error(error);
        next(error);
    }
}
export const getPostByIdController=async (req, res, next)=>{
    try {
        const postId=req.params.postId;
        
        console.log(postId,"hello hello");
        const post = await getPostByIdService(postId);
        res.status(StatusCodes.OK).json(post);
    }
    catch(error){
        console.error(error);
        next(error);
    }
}
export const getPostByUserIdController=async (req, res, next)=>{
    try {
        const userId=req.params.userId;
        const post = await getPostByUserIdService(userId);
        res.status(StatusCodes.OK).json(post);
    }
    catch(error){
        console.error(error);
        next(error);
    }
}

export const deletePostByIdController=async(req, res, next)=>{
    try {
        const postId=req.params.postId;
        const loggedInUserId=req.userId;
        const deletedPost= await deletePostByIdService(postId, loggedInUserId);
        res.status(StatusCodes.OK).json({message: "Post deleted successively"});
    } catch (error) {
        console.error(error);
        next(error);
    }
}

export const updatePostByIdController = async (req, res, next)=>{
    try {
        updatePostSchema.parse(req.body);
        const postId=req.params.postId;
        const data = await updatePostByIdService(postId, req.body, req.userId);
        res.status(StatusCodes.OK).json(data);
    } catch (error) {
        console.error(error);
        next(error);
    }
}