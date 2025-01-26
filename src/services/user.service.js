
export const userLoginService=async (loginData)=>{
    console.log(loginData)
    const email=loginData.email;
    const password=loginData.password;
    console.log("checking database for login");

    if(email=="abc@gmail.com"){
        if(password=="1234"){
        return {message:"login success"}
        }
        else{
            return {message:"login failed"}
        }
    }
    else{
        return {message:"login failed"}
    }
};