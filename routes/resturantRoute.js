const express = require("express");
const authmiddleware = require("../middleware/authmiddleware");
const { createResturnat, getAllResturantController, getResturantById, deleteResturant } = require("../controllers/resturantController");


const router = express.Router()
router.post("/create",authmiddleware,createResturnat)
// get all resturant
router.get("/getAll",getAllResturantController)
router.get("/get/:id",getResturantById)
router.delete("/deleteresturant/:id",authmiddleware,deleteResturant)
module.exports = router