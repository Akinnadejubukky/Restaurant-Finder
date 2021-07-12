var express=require("express");
var router=express.Router();
var passport=require("passport");
var User=require("../models/userModel");
router.get("/register",function (req,res) {
   res.render("register");
});
router.get("/login",function (req,res) {
   res.render("login");
});
router.post("/register",function (req,res) {
  User.register(({username:req.body.username}),req.body.password,function (err,user) {
     if(err){
        console.log(err);
        req.flash("error",err.message);
        return res.redirect("/register");
     }
     passport.authenticate("local")(req,res,function () {
         req.flash("success","Welcome to our website "+req.body.username);
res.redirect("/");
     });

  });
});
router.post("/login",passport.authenticate("local",{successRedirect:"/",failureRedirect:"/login"}),function (req,res) {
});

router.get("/logout",function (req,res) {
   req.logout();
   res.redirect("/");
});
module.exports=router;