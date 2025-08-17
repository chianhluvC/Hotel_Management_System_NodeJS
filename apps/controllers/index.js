var express = require("express");
var router = express.Router();

router.use("/admin", require(__dirname+"/admin/admincontroller"));
router.use("/authenticate", require(__dirname + "/authenticatecontroller"));
router.use("/room", require(__dirname+"/roomcontroller"));
router.use("/booking", require(__dirname+"/bookingcontroller"));

router.get("/", function(req, res){
    res.render("index.ejs");
});

router.get("/register", function(req, res){
    res.render("register.ejs");
});

router.get("/login", function(req, res){
    res.render("login.ejs");
});

router.get("/rooms", function(req, res){
    res.render("rooms.ejs");
});

router.get("/room-details/:id", function(req, res){
    res.render("room-details.ejs");
});


module.exports = router;