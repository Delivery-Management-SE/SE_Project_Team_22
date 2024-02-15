import express from 'express';
import mongoose from "mongoose";
const app = express()
app.listen(3000, () => {
    console.log("Server is running on post 3000");
});

mongoose.connect("mongodb+srv://test:test@blog.w3skzwn.mongodb.net/blog?retryWrites=true&w=majority")

app.get('/test' , (req,res) =>{
    res.json({message : "API"});
});