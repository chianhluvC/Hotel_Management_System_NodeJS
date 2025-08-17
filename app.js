var express = require("express");
var bodyParser = require('body-parser');
var cookieParser = require("cookie-parser");
var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.json());



var controller = require(__dirname+"/apps/controllers");
app.use(controller);


app.set("views",(__dirname+"/apps/views"));
app.set("view engine", "ejs");
app.use("/static", express.static(__dirname + "/public"));




var server = app.listen(3000,function(){
    console.log("server is running");
});