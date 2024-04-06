const categorymodel = require("../models/categorymodel")

const createCategoryController = async (req,res)=>{
    try {
       const {title,imageUrl} = req.body
       if(!title){
        return res.status(404).send({
            success:false,
            message:'All fiels are required'
        })
       } 
       const newCategory = new categorymodel({title, imageUrl})
       await newCategory.save();
       res.status(202).send({
        success:true,
        message:'Category create success',
        newCategory
       })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success:false,
            message:'Server errro',
            error
        })
    }
}
const getAllCategory = async (req,res)=>{
    try {
        const categories = await categorymodel.find({})
        if(!categories){
            return res.status(404).send({
                success:false,
                message:'No category found'
            })
        }
        res.status(202).send({
            success:true,
            message:'Category found',
            totalCountCategory:categories.length,
            categories
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success:false,
            message:'serrer error'
        })
    }

}
const updateCategory = async (req,res)=>{
    try {
        const {id} = req.params;
        const {title, imageUrl} = req.body;
        const updateCategory = await categorymodel.findByIdAndUpdate(id,{title,imageUrl},{new:true})
       if(!updateCategory){
        return res.status(404).send({
            success:false,
            message:'Category is not update'
        })
       }
       res.status(202).send({
        success:true,
        message:'Category update',
        updateCategory
       })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success:false,
            message:'Server Error'
        })
        
    }
}
const deleteCategory = async (req,res)=>{
    try {
      const {id} = req.params;
      if(!id){
        return res.status(404).send({
            success:false,
            message:'Id not found'
        })
      }
      const category = await categorymodel.findById(id)
      if(!category){
        return res.status(404).send({
            success:false,
            message:'Category not found'
        })
      } 
      await categorymodel.findByIdAndDelete(category)
      res.status(202).send({
        success:true,
        message:'Category delete success'
      })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success:false,
            message:'Server error'
        })
    }
}
module.exports = {
    createCategoryController,
    getAllCategory,
    updateCategory,
    deleteCategory
}