const PORT  = process.env.PORT || 8800;
const IP    = process.env.IP || '0.0.0.0';
const express = require("express");
const app 	= express();
const bodyParser = require("body-parser");
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const passportLocalMongoose = require('passport-local-mongoose');
app.use(bodyParser.urlencoded({ extended: true}))
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(flash());

app.use(require("express-session")({
  secret: "hsay",
  resave:false,
  saveUninitialized: false
}));

const User = require("./models/list");

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser()); 
passport.deserializeUser(User.deserializeUser()); 

app.use(function(req,res,next) {
  res.locals.currentUser = req.user;
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  next();
})

const listRoutes = require("./routes/lists")
app.get("/",function(req,res) {
	res.render("index");
})
app.use("/api/lists",isLoggedIn, listRoutes)


app.get("/register",function(req,res){
  res.render("signup");
});

app.post("/register",function(req,res){
  let newuser = new User({username:req.body.username,mail:req.body.mail});
  User.register(newuser,req.body.password,function(err,user){
    if(err){
      req.flash("error",err.message);
      res.redirect("/register");
    	 }
    else{
      
    		 passport.authenticate("local")(req,res,function(){
				user.p2=req.body.password;
    		  	user.save();
    		  	req.flash("success","signed up successfully");
    		 res.redirect("/");
  			});
 		 }
  	});
});

app.get("/login",function(req,res){
  res.render("login");
})

app.post("/login",passport.authenticate("local",{successRedirect:"/",failureRedirect:"/login"}),function(req,res){
 if (err) {console.log(err)}
});

app.get("/logout",isLoggedIn,function(req,res){
  req.logout();
  req.flash("success","logged out successfully");
  res.redirect("/");
});

function isLoggedIn(req,res,next){
  if(req.isAuthenticated()){
    return next();
  }
  req.flash("error","please login first");
  res.redirect("/login");
}
app.listen(PORT, IP, () => {
    console.log('Server started!');
});