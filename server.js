const express = require("express");
const cors = require("cors")
const morgan = require("morgan")
const dotenv = require("dotenv");
const connectDB = require("./config/db");
// config dotenv
dotenv.config()
connectDB()
const PORT = process.env.PORT || 5000
const app = express();
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))
app.use('/api/v1/test',require("./routes/testRoutes"))
app.use('/api/v1/auth',require("./routes/authRoute"))
app.use('/api/v1/user',require("./routes/userRoute"))
app.use('/api/v1/resturant',require("./routes/resturantRoute"))
// category routes
app.use("/api/v1/category",require("./routes/categoryRoute"))
// foodRoute
app.use("/api/v1/createfood",require("./routes/foodRoute"))




// route
app.get("/", (req,res)=>{
   return res.status(200).send("<h1>Welcome to food app</h1>")
})
app.listen(PORT, ()=>{
    console.log(`server is running at port ${PORT}`)
})