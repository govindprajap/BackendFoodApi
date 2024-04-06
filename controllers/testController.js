const testUserController = (req,res)=>{
    try {
        res.status(200).send({
            success:true,
            message:'test user data app'
        })
    } catch (error) {
        console.log(error)
    }

}
module.exports = {
    testUserController
}