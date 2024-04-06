const mongoose = require("mongoose");
const foodSchema = mongoose.Schema({
    title:{
        type:String
    },
    description:{
        type:String
    },
    price:{
        type:Number
    },
    foodTags:{
        type:String
    },
    category:{
        type:String
    },
    code:{
       type:String 
    },
    isAvilable:{
        type:Boolean,
        default:true,
    },
    resturant:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Resturnt'
    },
    rating:{
        type:Number,
        default:5,
        min:2,
        max:5
    },
    ratingCount:{
        type:String
    }

},{timestamps:true})
module.exports = mongoose.model("Food",foodSchema)