let express=require("express");
let userController=require("../controllers/user.js");
let router=express.Router();

router.post("/register",userController.userRegister);
router.post("/login",userController.userLogin);




module.exports=router













