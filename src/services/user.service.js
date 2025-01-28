
import { prisma } from "../db/db.js";


export const userLoginService=async (loginData)=>{
    console.log(loginData)
    const email=loginData.email;
    const password=loginData.password;
    console.log("checking database for login");

    if(email=="abc@gmail.com" && password=="1234"){
        return {message:"login success"}
        }
        else{
            return {message:"login failed"}
        }

};

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
    process.exit(1)
})


export const WriteuserService=async(loginData)=>{
    console.log(loginData)
    await prisma.user.create({
        data: {
            fullName:loginData.name,
            email:loginData.email,
            password:loginData.password,
            gender:loginData.gender,
            },
    })

const writeUser=await prisma.user.findMany({

})
console.dir(writeUser,{depth:null})
}

