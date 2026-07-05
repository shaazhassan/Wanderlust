const express=require("express");
const wrapAsync = require("../utils/wrapAsync");
const router=express.Router();
const User = require('../models/user.js');
const passport=require("passport");
const {saveRedirectUrl}=require("../middleware.js");
const userController=require("../controllers/users.js");

router.route("/signup").
get(userController.renderSignupForm).
post(wrapAsync(userController.createUser));

// router.get("/signup",userController.renderSignupForm);

// router.post("/signup",
//     wrapAsync(userController.createUser));

router.route("/login").get(userController.renderLoginForm).
post(saveRedirectUrl,
    passport.authenticate("local",{
        failureRedirect:"/login",
failureflash:true,
    }),
   userController.loginUser
);
// router.get("/login",userController.renderLoginForm);


// router.post("/login",saveRedirectUrl,
//     passport.authenticate("local",{
// failureRedirect:"/login",
// failureflash:true,
//     }),
//    userController.loginUser

// );

router.get("/logout",userController.logoutUser);


module.exports=router;