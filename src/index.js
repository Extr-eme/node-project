import express from "express";
import 'dotenv/config'
import userRouter from "./routes/user.route.js";
import statusCodes from "http-status-codes"
import bodyParser from "body-parser";
import { errorHandler } from "./libs/errorhandler.js";
import cors from "cors"
import postRouter from "./routes/post.routes.js";

const app=express();
const PORT= process.env.PORT;

app.use(cors());
app.use(bodyParser.json())
app.get('/', (req, res)=>{
    res.status(statusCodes.OK).json({message:"Welcome to my app"})
});


app.use('/api/users', userRouter);
app.use('/api/posts', postRouter);


app.use(errorHandler);

app.listen(PORT, ()=>{
    console.log(`Server running at ${PORT}`)
     
});