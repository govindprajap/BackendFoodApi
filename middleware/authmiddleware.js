const jwt = require("jsonwebtoken");
module.exports = async (req,res,next)=>{
    try {
        const token = req.headers["authorization"].split(" ")[1]
        jwt.verify(token, process.env.JWT_SECRECT, (err, decoded)=>{
            if(err){
                return res.status(404).send({
                    success:false,
                    message:'Unauthorized User'
                })
            }else{
                req.body.id = decoded.id;
                next()
            }
        })
        
    } catch (error) {
       console.log(error)
       return res.status(404).send({
        success:false,
        message:'Please provide token'
       }) 
    }
}