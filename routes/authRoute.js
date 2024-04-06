const express = require("express");
const {registerController, loginController} = require("../controllers/authController");
const router = express.Router();
// all route
// register route
router.post('/register',registerController)
router.post('/login',loginController)





module.exports = router;