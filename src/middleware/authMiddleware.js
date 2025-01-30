import jwt from "jsonwebtoken"
import { StatusCodes } from "http-status-codes"
import { prisma } from "../db/db"

export const authMiddleWare=(req,res,next)=>{
    const authHeader=req.headers.authorization
    const authToken=authHeader.split(" ")[1]
    if(!authToken){
        res.status(StatusCodes.UNAUTHORIZED).json({message:"invalid token"})
    }
    console.log(authToken)
    try{
        const saman=jwt.verify(authToken,process.env.JWT_SECRET)
        console.log(saman)
        const user=prisma.user.findUnique({where:{id:saman.sub}})
        if(!user){
            res.status(StatusCodes.UNAUTHORIZED).json({message:"invalid token"})
        }
        next()
    }catch(error){
        console.log(error)
    }
}