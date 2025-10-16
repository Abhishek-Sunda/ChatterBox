import mongoose from "mongoose";

// function to connect to mongoDb Database 

export const connectDB = async()=>{
    try
    {
        mongoose.connection.on("connected", ()=>console.log("Database Connected"));

        await mongoose.connect(`${process.env.MONGOFB_URI}/ chat-app`)
    }
    catch(error)
    {
        console.log(error);
    }
}