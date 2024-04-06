const express = require("express");
const authmiddleware = require("../middleware/authmiddleware");
const { foodControllers, getAllFoodControllers, getSingleFoodController, getResturantControllerById, orderPlacerController } = require("../controllers/foodControllers");
const adminMiddleware = require("../middleware/adminMiddleware");


const router = express.Router()
// create food
router.post("/createfood",authmiddleware,foodControllers)
router.get("/getAll",getAllFoodControllers)
router.get("/get/:id",getSingleFoodController)
router.get("/getresturantId/:id",getResturantControllerById)
// order place
router.post("/placeOrder",authmiddleware,orderPlacerController)
// ORDER STATUS
router.post("/orderStatus/:id",authmiddleware,adminMiddleware,orderPlacerController)


module.exports = router