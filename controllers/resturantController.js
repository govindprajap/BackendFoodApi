const resturantModel = require("../models/resturantModel");

const createResturnat = async(req,res)=>{
    try {
       const {title,imageUrl,food,time,pickup,delivery,isOpen,logoUrl,rating,ratingCount,code,coords} = req.body;
       if(!title || !coords){
        return res.status(400).send({
            success:false,
            message:'Must be required'
        })
       }
        const newResturant = new resturantModel({
            title,imageUrl,food,time,pickup,delivery,isOpen,logoUrl,rating,ratingCount,code,coords, })
            await newResturant.save() 
        res.status(200).send({
            success:true,
            message:'New resturant successfully',
            newResturant
        })
    } catch (error) {
        console.log("===============================================")
        console.log(error)
        return res.status(500).send({
            success:false,
            message:'Server error',
            error
        })
    }

}
const getAllResturantController = async (req,res)=>{
  try {
    const resturants = await resturantModel.find({})
    if(!resturants){
        return res.status(404).send({
            success:false,
            message:'Resturant found'

            
        })
    }
    res.status(202).send({
        success:true,
        totalCount:resturants.length,
        resturants
    })
  } catch (error) {
    console.log(error)
    return res.status(500).send({
        success:false,
        message:'Server error'
    })
  }
}
// get data by id
const getResturantById = async(req,res)=>{
    try {
        const resturantId = req.params.id;
        if(!resturantId){
            return res.status(404).send({
                success:false,
                message:'Please provide resturnatId'
            })
        }
        // find resturant
        const resturant = await resturantModel.findById(resturantId);
        if(!resturant){
            return res.status(404).send({
                success:false,
                message:'Resturant not found'
            })
        }
        res.status(202).send({
            success:true,
            message:'Resturaant found',
            resturant

        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success:false,
            message:'Not found'
        })
    }
}
const deleteResturant = async(req,res)=>{
    try {
        const resturantId = req.params.id;
        if(!resturantId){
            return res.status(404).send({
                success:false,
                message:'Please provide id'
            })
        }
        if(!resturantId){
            return res.status(404).send({
                success:false,
                message:'No resturant found'
            })
        }
        await resturantModel.findByIdAndDelete(resturantId)
        res.status(202).send({
            success:true,
            message:'Resturant delete successfully'
        })
    } catch (error) {
       console.log(error)
       return res.status(500).send({
        success:false,
        message:'Server error'
       }) 
    }
    return res.status(200).send({
        success:false,
        message:'resturant delete successfully'
    })
}
module.exports = {
    createResturnat,
    getAllResturantController,
    getResturantById,
    deleteResturant
}