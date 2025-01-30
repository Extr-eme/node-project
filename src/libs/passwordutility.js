import bcrypt from "bcrypt"
import { error } from "console"

const saltRound=10
export const generateHashForPass=async (password)=>{
    try{
       const hash= await bcrypt.hash(password,saltRound)
        return hash;

    }catch(e){
        console.log(error)
        nextTick(error)
    }

}

export const checkPassword=async(password,hash)=>{
    return await bcrypt.compare(password,hash);

}