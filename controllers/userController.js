const userModel = require("../models/userModel")
const bcrypt = require("bcrypt")

const getUserController = async (req,res)=>{
    try {
       const foundUser = await userModel.findById({_id:req.body.id})
       if(!foundUser){
        return res.status(404).send({
            success:false,
            message:'User is not present'
        })
       } 
       res.status(200).send({
        success:true,
        message:'User found',
        foundUser
       })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success:false,
            message:'Interval server error',
            error
        })
    }
}

const updateUser = async (req,res)=>{
    try {
      const user = await userModel.findById({_id:req.body.id})
      if(!user){
        return res.status(404).send({
            success:false,
            message:'User not exist'
        })
      } 
      const {username, phone, address, } = req.body;
      if(username) user.username = username
      if(address) user.address = address
      if(phone) user.phone = phone
      await user.save();
      res.status(202).send({
        success:true,
        message:'User updata success',
        user
      })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success:false,
            message:'Invalid server error',
            error
        })

    }

}
const resetPassword = async (req,res)=>{
    try {
        
        const {email, newPassword, answer} = req.body;
        if(!email || !newPassword || !answer){
            return res.status(404).send({
                success:false,
                message:'Please provide detail all'
            })
        }
        const user = await userModel.findOne({email})
        if(!user){
            return res.status(404).send({
                success:false,
                message:'user not found'
            })
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.newPassword = hashedPassword
        await user.save();
        res.status(202).send({
            success:true,
            message:'password reset successfully'
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success:false,
            message:'Server error'
        })
    }
        
    }
    const updatePassword = async (req,res)=>{
        try {
            
            const user = await userModel.findById({_id:req.body.id})
            if(!user){
                return res.status(202).send({
                    success:false,
                    message:'User is not found'
                })
            }
            const {oldPassword, newPassword} = req.body;
            if(!oldPassword || !newPassword){
                return res.status(404).send({
                    success:false,
                    message:'Please provide details'
                })
            }
            const mathcPassword = await bcrypt.compare(oldPassword, user.password);
            if(!mathcPassword){
                return res.status(404).send({
                    success:false,
                    message:'Invalid oldpassword'
                })
            }
            
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            user.password = hashedPassword
            await user.save()
            res.status(202).send({
                success:true,
                message:'password updata success'
            })
        } catch (error) {
         console.log(error)
         return res.status(500).send({
            success:false,
            message:'Server error'
         })   
        }
        }
        // delete user profile
const deleteUserProfile = async (req,res)=>{
    try {
        await userModel.findByIdAndDelete(req.params.id)
        return res.status(200).send({
            success:true,
            message:'Your account has been deleted'
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success:false,
            message:'Error in delete account',
            error
        })

    }

}        
        
module.exports = {
    getUserController,
    updateUser,
    resetPassword,
    updatePassword,
    deleteUserProfile
}