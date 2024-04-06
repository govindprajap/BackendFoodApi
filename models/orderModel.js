const mongoose = require("mongoose");
const orderSchema = mongoose.Schema({
    foods:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Food'
        },

    ],
    payment:{},
    buyer:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    status:{
        type:String,
        enum:['preparing','on the way', 'deliverd'],
        default:"preparing"
    }

},{timestamps:true})
module.exports = mongoose.model("Order",orderSchema)