import express from "express";
import 'dotenv/config';
import userRouter from "./user.route.js";
import bodyParser from "body-parser";
import { errorHandler } from "./libs/errorhandler.js";


const app=express()
const PORT=process.env.PORT

app.use(bodyParser.json())
userRouter.get("/",(req,res)=>{
    res.status(200).json({message:"welome to this websitee"})

});
app.use("/api/users",userRouter)

app.use(errorHandler)

app.listen(PORT,()=>{
    console.log(`server running at ${PORT}`);
    
})