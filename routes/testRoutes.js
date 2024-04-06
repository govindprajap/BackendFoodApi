const express = require("express");
const { testUserController } = require("../controllers/testController");

const router = express.Router()
router.get("/testUser",testUserController)
module.exports = router;