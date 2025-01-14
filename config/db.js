const mongoose = require("mongoose")
const connectDB = async ()=>{
    try {
      const connectionInstance  = await mongoose.connect(`${process.env.MONGODB_URL}`)
      console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`)
     
    } catch (error) {
        console.log("MONGODB Connection error ", error.message)
        // process.exit(1)
        
    }
}
module.exports = connectDB