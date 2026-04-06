import mongoose from "mongoose";

export const connectDb = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI as string)
        .then(()=>console.log("DB is connected"));
    }catch(error){
        console.error("Db error",error);
        process.exit(1);
    }
}