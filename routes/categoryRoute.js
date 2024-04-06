const express = require("express");
const authmiddleware = require("../middleware/authmiddleware");
const { createCategoryController, getAllCategory, updateCategory, deleteCategory } = require("../controllers/categoryControllers");
const router = express.Router()
// create category
router.post('/create',authmiddleware,createCategoryController)
router.get('/getAll',getAllCategory)
router.put('/update/:id',authmiddleware,updateCategory)
router.delete('/delete/:id',authmiddleware,deleteCategory)

module.exports = router