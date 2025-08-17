var express = require('express');
var router = express.Router();
const jsonwebtoken = require("jsonwebtoken");
const jwtExprirySeconds = 1000;
var config = require('../../config/setting.json');
var verifyToken = require("../util/VerifyToken");
const bcrypt = require('bcrypt');
const User  = require("../model/User");
var UserService = require("../service/userService");
const {jwtDecode} = require("jwt-decode");
var localStorage = require("localStorage");

router.post("/register", async (req, res, next)=>{
    const {username, email, password, phone} = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({username, email, password: hashedPassword , phone});
        var userService = new UserService();
        var userNew = await userService.insertUser(user);
        res.json({message:'Registration successful'});
    } catch (error) {
        next(error);
    }

});



router.post("/login", async (req, res, next) =>{
    const { username, password} = req.body;
    console.log(`${username} is trying to login ..`);
    try {
        var userService = new UserService(); 
        const user = await userService.getUser(username);
        if(!user){
            return res.status(404).json({message:'User not found'});
        }
        const passwordMatch = await userService.comparePassword(password, user);
        if(!passwordMatch){
            return res.status(401).json({message:'Incorrect password'});
        }
        console.log(`Hello ${username}`);
        if(user.isAdmin){
            var authorities = [];
    
            authorities.push("admin");
            authorities.push("user");
    
            var claims = [];
            claims.push("room.view");
            claims.push("room.edit");
            claims.push("room.delete");
            const token = jsonwebtoken.sign({
                    user: user.username, 
                    roles: authorities,
                    claims: claims
            }, 
            config.jwt.secret, {
                expiresIn: jwtExprirySeconds
            });

            res.cookie("jsonwebtoken",token);
            user.password ="";
            return res.status(200).json({
                user
            });

    
        }
    
        if(!user.isAdmin){
    
            var authorities = [];
    
            authorities.push("user");
    
            var claims = [];
            const token = jsonwebtoken.sign({
                user: user.username, 
                roles: authorities,
                claims: claims
        }, 
            config.jwt.secret, {
                expiresIn: jwtExprirySeconds
            });
            
            res.cookie("jsonwebtoken",token);
            return res.status(200).json({
                user
            });
    
    
        }
    } catch (error) {
        
        next(error);
    }
    

});


router.get("/logout", async(req, res,next) =>{
    res.cookie("jsonwebtoken"," ",{expiresIn: "-1"});
    return res.status(200).json({message: "you have been logged out"});
});



router.get("/getCookie", async(req, res)=>{
    const cookie = req.cookies.jsonwebtoken;
    return res.status(200).json(cookie);
});


router.get("/get-user-login", async(req, res)=>{
    const cookie = req.cookies.jsonwebtoken;
    if(cookie == " "||cookie == null)
        return res.status(404).json("No user login!"); 
    else if(jwtDecode(cookie).exp <Date.now()/1000){
        localStorage.clear();
        return res.status(404).json("No user login!");
    } 
    else if(cookie!=null){
        const userName = jsonwebtoken.verify(cookie, config.jwt.secret).user;
        return res.status(200).json(userName);
    }
    else
    return res.status(404).json("No user login!");
    
});

// Get user by  name

router.get("/get-user", async function (req, res) {
    var userService = new UserService();
    var user = await userService.getUser(req.query.username);
    res.json(user);
  });

  router.get("/get-user-list", async function (req, res) {
    var userService = new UserService();
    var list = await userService.getUserList();
    res.json(list);
  });


router.get("/test-security", verifyToken("user"), (req, res)=>{
    console.log(req.userData);
    res.json({"status": true, "message": "login success"});
});

module.exports = router;


