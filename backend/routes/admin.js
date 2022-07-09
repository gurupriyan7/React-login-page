const express =require("express");
const router =express.Router()
const {authAdmin} = require('../controllers/adminController');
const { getAllUsers,deleteUser,getUser ,updateUser } = require("../controllers/userController");


router.route('/login').post(authAdmin)
router.route('/').get(getAllUsers)
router.route("/deleteUser").delete(deleteUser)
router.route("/edituser/:userId").get(getUser)
router.route("/edituser/:userId").patch(updateUser)  


module.exports= router;