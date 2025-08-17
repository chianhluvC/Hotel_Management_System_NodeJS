var express = require("express");
var router = express.Router();
const verifyToken = require("../../util/VerifyToken.js");

router.get("/",verifyToken("admin"), function(req, res){
    res.render("admin/index.ejs")
});


router.get("/room-list", function(req, res){
    res.render("admin/room/manageRoom.ejs")
});

router.get("/add-room",verifyToken("admin"), function(req, res){
    res.render("admin/room/addRoom.ejs")
});

router.get("/edit-room/:id",verifyToken("admin"), function(req, res){
    res.render("admin/room/editRoom.ejs")
});

router.get("/booking-list", function(req, res){
    res.render("admin/booking/manageBooking.ejs")
});

router.get("/user-list", function(req, res){
    res.render("admin/user/manageUser.ejs")
});

module.exports = router;