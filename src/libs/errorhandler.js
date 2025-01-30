import { Prisma } from "@prisma/client";
import { StatusCodes } from "http-status-codes";

export const errorHandler=(error,req,res,next)=>{
    console.log("error logged:",error?.message)
    if(error instanceof Prisma.PrismaClientInitializationError){
        
    }
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        error:"internal server error",
        message:"an unexpected error occured"
    })
}