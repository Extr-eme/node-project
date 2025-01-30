
import { error } from "console";
import { prisma } from "../db/db.js";
import { checkPassword, generateHashForPass } from "../libs/passwordutility.js";
import { register } from "module";
import { truncate } from "fs/promises";
import { genetateJwtToken } from "../libs/jwt_utils.js";


export const userLoginService=async (loginData)=>{
    console.log(loginData)
    const email=loginData.email
    const password=loginData.password
    console.log("checking database for login");
    const user=await prisma.user.findUnique({where:{email}})
        if(!user){
            throw new Error("invalid creds",{cause:"invalid email"})
        }
        const ispasssame=await checkPassword(password,user.password)
        if(!ispasssame){
            throw new Error("invalid creds",{cause:"invalid password"})
        }
        else{
            const token=genetateJwtToken(user.id);
            delete user.password
            return {message:"login success",user,token};
        }
    }


export const allUserService=async()=>{
    const allUsers=await prisma.user.findMany({omit:{
        password:true
   }})
    
    
    return allUsers;
}
allUserService()
.then(async()=>{
    await prisma.$disconnect()
})
.catch(async(e)=>{
    console.log(e)
    await prisma.$disconnect()
    next(error)
})


export const WriteuserService=async(loginData)=>{
    const hashedPassword= await generateHashForPass(
        loginData.password
    )
  try{  const createData={
        fullName:loginData.name,
            email:loginData.email,
            password:hashedPassword,
            gender:loginData.gender,

    }
    console.log(loginData)
   const res= await prisma.user.create({
        data: createData,
        omit:{
            password:true
        }
    })
    const token=genetateJwtToken(res.id);
    return {message:"registration success",res,token};


const WriteuserService=await prisma.user.findMany({

})
console.dir(WriteuserService,{depth:null})
}catch(e){
    console.log(e)
    next(error)

}
}

