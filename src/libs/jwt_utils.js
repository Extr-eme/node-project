import JsonWebToken from "jsonwebtoken";

export const genetateJwtToken=(userId)=>{
    const payload={
        sub:userId,
        issueAt:new Date(),

    }
    const options={
        expiresIn:"2h",
   } 
    try{
        const token=JsonWebToken.sign(payload,process.env.JWT_SECRET,options)
            return token
       

    }catch(error){
        console.log(error)
        throw new Error("Authorization error",{cause:"validation_error"})
    }

}