import { connect, model, Schema }  from "mongoose"

let db;
export const connectDb=async()=>{
    try{
        await connect(process.env.DB_URI);
        console.log("database connected successfully")
        const kittySchema = new Schema({
            name:String,
        });
        const Kitten=model("Kitten",kittySchema);
    }
    catch(error){
        console.error(error)
    }
}