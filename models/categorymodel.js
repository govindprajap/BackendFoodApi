const mongoose = require("mongoose");
const categorySchema = mongoose.Schema({
    title:{
        type:String,
    },
    imageUrl:{
        type:String,
        default:'https://img.freepik.com/free-vector/detailed-chef-logo-template_23-2148986823.jpg'
    }
   

},{timestamps:true})
module.exports = mongoose.model("Category",categorySchema)