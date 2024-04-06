const express = require("express");
const { getUserController, updateUser, resetPassword, updatePassword, deleteUserProfile } = require("../controllers/userController");
const authmiddleware = require("../middleware/authmiddleware");


const router = express.Router()
router.get('/getUser',authmiddleware, getUserController);
// update user
router.put('/update',authmiddleware,updateUser)
// resetpassword
router.post('/resetpassword',authmiddleware,resetPassword)
// update user password
router.post('/updatapassword',authmiddleware,updatePassword)
// delete user
router.delete('/deleteUser/:id',authmiddleware,deleteUserProfile)
module.exports = router