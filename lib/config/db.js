import mongoose from "mongoose";

export const ConnectDB = async ()=>{
    await mongoose.connect('mongodb+srv://vaibhavkhadse838:PKCkLtQ6rYGxK5yc@cluster0.wegkj.mongodb.net/blog-app')
    console.log("DB connected");
    
}