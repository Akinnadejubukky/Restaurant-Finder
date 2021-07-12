var middlewares={};
middlewares.isLoggedIn=function(req,res,next){
  if(req.isAuthenticated())
      next();
  else {
      req.flash("error","You must be logged in to perform this action !");
      res.redirect("/login");
  }
};
module.exports=middlewares;