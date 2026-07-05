const User = require('../models/user.js');

module.exports.createUser = async (req,res)=>{
        try{
    let {username,email,password}=req.body;
    const newUser= new User ({email,username});
    const registeredUser=await User.register(newUser,password);
    console.log(registeredUser);
    //to login immediately after signup using inbuilt passport login feature
    req.login(registeredUser,(err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","Welcome to Wanderlust!");
    res.redirect("/listings");
    })
    
        }
        catch(err){
            req.flash("error",err.message);
              res.redirect("/signup"); 
        }
};

module.exports.renderSignupForm=(req,res)=>{
    res.render("users/signup.ejs");
};

module.exports.renderLoginForm=(req,res)=>{
    res.render("users/login.ejs");
};

module.exports.loginUser= async (req,res)=>{
        req.flash("success","Welcome back to Wanderlust!");
        let redirectUrl= res.locals.redirectUrl || "/listings"; //same page redirect but problem is invoked only when isLoggedin invokes,but what if someone simplylogs in from home page so both cases.
        res.redirect(redirectUrl);
    };

module.exports.logoutUser= (req,res,next)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
    }
    req.flash("success","Logged Out Successfully!");
    res.redirect("/listings");
    })
};