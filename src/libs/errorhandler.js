import { Prisma } from "@prisma/client";
import { StatusCodes } from "http-status-codes";
import pkg from "jsonwebtoken";
import { ZodError } from "zod";
const {JsonWebTokenError}=pkg;
export const errorHandler = (error, req, res, next) => {
  console.error("Error logged in error handler:--", error?.message);
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
      case "P2002": // Unique constraint failed
        res.status(StatusCodes.CONFLICT).json({
          error: `Unique constraint failed on ${
            error.meta?.target || "unknown field"
          }`,
          message: `${error.meta?.target || "unknown field"} already exists`,
        });
        return;
      case "P2025": // Record not found
        res.status(StatusCodes.NOT_FOUND).json({
          error: "Not Found",
          message: "The requested resource could not be found.",
        });
        return;
      default:
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
          error: "Internal Server Error",
          message: "An unexpected error occurred.",
        });
        return;
    }
  }
  if (error instanceof ZodError){
    const errorMessages=error.errors.map((issue)=>({
      message:`${issue.path.join(".")} is ${issue.message}`,
    }))
    res.status(StatusCodes.BAD_REQUEST).json({
      error: "Invalid data",
      message: errorMessages,
    });
    return;
  }
  if (error?.cause=="invalidCredentials"){
    res.status(StatusCodes.UNAUTHORIZED).json({
      error:"Unauthorized error",
      message:"invalid login credentials",
    })
  }
  if (error?.cause=="noSuchUser"){
    res.status(StatusCodes.UNAUTHORIZED).json({
      error:"Unauthorized error",
      message:"User not found",
    })
  }
  if (error?.cause=="tokenGenerationError"){
    res.status(StatusCodes.UNAUTHORIZED).json({
      error:"jwt error",
      message:"token can't be generated",
    })
  }
  if (error instanceof JsonWebTokenError){
    res.status(StatusCodes.UNAUTHORIZED).json({
      error:"Unauthorized error",
      message:"Invalid Token"
    })
  }
  if (error?.cause=="NotFoundCustom"){
    res.status(StatusCodes.NOT_FOUND).json({
      error:"not found error",
      message:"post not found",
    })
  }
  if (error?.cause=="NotFoundByUserCustom"){
    res.status(StatusCodes.NOT_FOUND).json({
      error:"not found by user error",
      message:"post not found of user",
    })
  }
  if (error?.cause=="UnauthorizedCustom"){
    res.status(StatusCodes.NOT_FOUND).json({
      error:"user unauthorized error",
      message:"user not allowed to do this",
    })
  }
  

  // Catch-all for unexpected errors
  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    error: "Internal Server Error",
    message: "An unexpected error occurred.",
  });
};