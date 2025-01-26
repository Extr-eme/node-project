
import { userLoginService } from "../services/user.service.js";



export const userLoginController=async(req,res)=>{
    console.log(req);
    try{
    const data=await userLoginService(req.body);
    res.status(200).json({data})
    }catch(error){
        console.log(error);
        next(error)
    }
}