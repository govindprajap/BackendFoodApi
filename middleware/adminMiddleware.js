const userModel = require("../models/userModel")

module.exports = async function (req,res,next){
    try {
        const user = userModel.findById(req.body.id)
        if(user.userType !== 'admin'){
            return res.status(404).send({
                success:false,
                message:'only admin access'
            })
        }else{
            next()
        }
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success:false,
            message:'Server error'
        })
    }

}