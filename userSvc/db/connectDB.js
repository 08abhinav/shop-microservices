import "dotenv/config";
import mongoose from "mongoose";

const url = process.env.MONGODB_URI

export async function dbConnection(){
    try{
        await mongoose.connect(url);
        console.log("Database connected successfully");
    }catch(err){
        console.log(`Database connection error: ${err}`);
    }
}