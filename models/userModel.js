const mongoose = require("mongoose")
const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true, 'username is required']
    },
    email:{
        type:String,
        required:[true, 'Email is required'],
        unique:true
    },
    password:{
        type:String,
        required:[true, 'Password is required'],
        
    },
    address:{
        type:Array
    },
    phone:{
        type:Number,
        required:[true, 'Number is required']
    },
    userType:{
        type:String,
        required:[true, 'user type is required'],
        default:'client',
        enum:['admin', 'client','vendor','driver']
    },
    answer:{
    type:String,
    required:[true, 'answer is required']
    },
    profile:{
        type:String,
        default:'https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg'
    }

},{timestamps:true})
module.exports = mongoose.model("User",userSchema)