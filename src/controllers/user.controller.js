
import { loginUserSchema } from "../schemas/user.schemas.js";
import { userLoginService ,allUserService,WriteuserService, userProfileservice} from "../services/user.service.js";

export const userLoginController=async(req,res,next)=>{
    console.log(req);
    try{
    const data=await userLoginService(req.body);
    res.status(200).json({data})
    }catch(error){
        console.log(error);
        next(error)
    }
}

export const allUserController=async(req,res,next)=>{
    console.log(req);
    try{
    const data=await allUserService(req.body);
    res.status(200).json({data})
    }catch(error){
        console.log(error);
        next(error)
    }
}

export const writeUser=async(req,res,next)=>{
    console.log(req)
    loginUserSchema.parse(req.body)
    try{
        const data=await WriteuserService(req.body);
        res.status(200).json({data})
    }catch(error){
        console.log(error)
        next(error)
    }
}
export const getUserProfile=async(req,res,next)=>{
    try{
        const data=await userProfileservice(req.userId)
        res.status(200).json(data)
    }
    catch(error){
        console.log(error)
        next(error)
    }

}