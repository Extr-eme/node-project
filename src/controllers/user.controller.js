
import { userLoginService } from "../services/user.service.js";



export const userLoginController=async(req,res)=>{
    console.log(req)
    const data=await userLoginService(req.body);
    res.status(200).json({data})
}