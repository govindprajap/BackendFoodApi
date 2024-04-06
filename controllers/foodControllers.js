const foodModel = require("../models/foodModel");
const orderModel = require("../models/orderModel");

const foodControllers = async (req,res)=>{
    try {
    const {title,description,price,foodTags,category,code,isAvilable,resturant,rating,ratingCount} = req.body;
      if(!title || !description || !price ||!resturant){
          return res.status(404).send({
            success:false,
            message:'please provide all field'
        })
    } 
    const newFood = new foodModel({
        title,description,price,foodTags,category,code,isAvilable,resturant,rating,ratingCount

    }) 
    await newFood.save()
    return res.status(200).send({
        success:true,
        message:'Food create success',
        newFood
    })
        
    } catch (error) {
      console.log(error)
      return res.status(500).send({
        success:false,
        message:'Server error',
        error
      })  
    }
}
const getAllFoodControllers = async (req,res)=>{
    try {
      const food = await foodModel.find({})
      if(!food){
        return res.status(404).send({
            success:false,
            message:'food not found'
        })
      }
      res.status(202).send({
        success:true,
        message:'food found',
        totalFoodCount:food.length,
        food
      })
    if(!food){
      return res.status(404).send({
        success:false,
        message:'No food found'
      })
    }  
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success:false,
            message:'Server error',
            error
        })
    }
}
const getSingleFoodController = async (req,res)=>{
  const foodById = req.params.id;
  if(!foodById){
    return res.status(404).send({
      success:false,
      message:'No Id found'
    })
  }
  const found = await foodModel.findById(foodById)
  if(!found){
    return res.status(404).send({
      success:true,
      message:'No food found'
    })
  }
  await res.status(202).send({
    success:true,
    message:'food found',
    found
  })
}
const getResturantControllerById = async (req,res)=>{
  const resturantId = req.params.id;
  if(!resturantId){
    return res.status(404).send({
      success:false,
      message:'No Id found'
    })
  }
  const found = await foodModel.find({resturant:resturantId})
  if(!found){
    return res.status(404).send({
      success:true,
      message:'No food found'
    })
  }
  await res.status(202).send({
    success:true,
    message:'food found',
    found
  })
}
const orderPlacerController = (req,res)=>{
  try {
   const {cart} = req.body;
   if(!cart){
    return res.status(404).send({
      success:false,
      message:'Please provide all details'
    })
   }
  //  calculate price
  let total = 0
  cart.map((i)=>{
    total+= i.price
  })
  const newOrder = new orderModel({
    food:cart,
    payment:total,
    buyer:req.body.id
  })
  res.status(202).send({
    success:true,
    message:'Order Placed success',
    newOrder
  })
  } catch (error) {
    console.log(error)
    return res.status(500).send({
      success:false,
      message:'Server error'
    })
  }
}
const orderStatusController = async (req,res)=>{
  try {
    const orderId = req.params.id;
    const {status} = req.body;
    const order = await orderModel.findByIdAndUpdate(orderId,{status}, {new:true})
    res.status(202).send({
      success:true,
      message:'order status change',
      order
    })
    
  } catch (error) {
    console.log(error)
    return res.status(500).send({
      success:false,
      message:'Server error',
      error
    })
  }
}
module.exports = {
    foodControllers,
    getAllFoodControllers,
    getSingleFoodController,
    getResturantControllerById,
    orderPlacerController,
    orderStatusController
}