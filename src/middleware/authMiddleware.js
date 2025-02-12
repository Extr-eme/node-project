import jsonwebtoken from "jsonwebtoken"
import { StatusCodes } from "http-status-codes";
import {prisma} from "../db/db.js"
export const authMiddleWare = async (req, res, next)=>{
    const authHeader = req.headers.authorization;
    const authToken = authHeader?.split(" ")[1];
    if (!authToken){
        res.status(StatusCodes.UNAUTHORIZED).json({message:"invalid token"});
    }
    console.log(authToken);
    try {
        const pload = jsonwebtoken.verify(authToken, process.env.JWT_SECRET);
        console.log(pload);
        const userId=pload.sub;
        const user= await prisma.user.findUnique({where:{id:userId}});
        if (!user){
            res.status(StatusCodes.UNAUTHORIZED).json({message:"invalid token"})
        }
        req.userId=userId;
        next();
    } catch (error) {
        console.log(error);
        next(error);
    }
}