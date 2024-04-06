const userModel = require("../models/userModel");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const registerController = async (req,res)=>{
    try {
      const {username, email, password, address, phone, answer} = req.body;  
      if(!username || !email || !password || !address || !phone || !answer){
        return res.status(402).json({
            success:false,
            message:'Please provide all field'
        })
      }
     const userExist = await userModel .findOne({email})
     if(userExist){
        return res.status(404).json({
            success:false,
            message:'User is already register Please login'
        })
     }
     const hashedPassword = await bcrypt.hash(password, 10);
     const newUser = await userModel.create({
        username,
        email,
        password:hashedPassword,
        address,
        phone,
        answer
     })
     res.status(201).json({
        success:true,
        message:'User Registration successfully',
        newUser
     })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Server error',
           
        })
    }
}
const loginController = async (req,res)=>{
     try {
    const {email, password} = req.body;
    if(!email || !password){
        return res.status(404).send({
            success:false,
            message:'Please provide email and password'
        })
    }
    const user = await userModel.findOne({email:email}) 
    if(!user){
        return res.status(404).send({
            success:false,
            message:'User not found'
        })
    } 
    // compare password
    const mathcPassword = await bcrypt.compare(password, user.password);
    if(!mathcPassword){
        return res.status(404).send({
            success:false,
            message:'Invalid password'
        })
    }
    // create token
    const token = await jwt.sign({id:user._id}, process.env.JWT_SECRECT,{
        expiresIn:"12h", 
    }) 

    user.password = undefined
    res.status(200).send({
        success:true,
        token,
        message:'User login successfully',
        user
    })  
     } catch (error) {
        console.log(error, error.message)
        res.status(500).send({
            success:false,
            message:'Internal server error',
            error
        })
     }    
}








module.exports = {
    registerController,
    loginController
};