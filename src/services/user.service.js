
import { error } from "console";
import { prisma } from "../db/db.js";


export const userLoginService=async (loginData)=>{
    console.log(loginData)
    const username=loginData.name
    const email=loginData.email
    const password=loginData.password
    const gender=loginData.gender
    console.log("checking database for login");
    const user=await prisma.user.findUnique({where:{email}})
        if(!user){
            return {message:"no user found"};
        }
        const checkpass=user.password==password;
        const checkuser=user.name==username
        if(!checkpass || !username){
            return {message:"wrong password or name"}
        }
        else{
            return {message:"login success"};
        }
    }

export const allUserService=async()=>{
    const allUsers=await prisma.user.findMany()
    return allUsers;
}
allUserService()
.then(async()=>{
    await prisma.$disconnect()
})
.catch(async(e)=>{
    console.error(e)
    await prisma.$disconnect()
    next(error)
})


export const WriteuserService=async(loginData)=>{
  try{  const createData={
        fullName:loginData.name,
            email:loginData.email,
            password:loginData.password,
            gender:loginData.gender,

    }
    console.log(loginData)
    await prisma.user.create({
        data: createData,
    })

const writeUser=await prisma.user.findMany({

})
console.dir(writeUser,{depth:null})
}catch(e){
    console.error(e)
    next(error)

}
}

