const PORT  = process.env.PORT || 8800;
const IP    = process.env.IP || '0.0.0.0';
const DBURI = process.env.DBURI || 'mongodb://localhost/stoxy';
var express = require("express");
var app 	= express();
const bodyParser = require("body-parser");
const flash = require('connect-flash');
const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const passportLocalMongoose = require('passport-local-mongoose');
app.use(bodyParser.urlencoded({ extended: true}))
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(flash());

const todoRoutes = require("./routes/todos")
app.get("/",function(req,res) {
	res.send("Hello from root")
})
app.use("/api/todos", todoRoutes)

app.listen(PORT, IP, () => {
    console.log('Server started!');
});