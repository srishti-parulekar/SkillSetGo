const express = require("express");
const passport = require("passport");

const ExtractJwt = require("passport-jwt").ExtractJwt;
const JwtStrategy = require("passport-jwt").Strategy;
const mongoose = require("mongoose");

require("dotenv").config(); //will require and then config the package
//the variables that we want to define will get defined. 


const app = express();



//to connect to mongodb from node we need to use mongoose
//it will take 2 arguments: connection string, connection options

mongoose.connect(
    "mongodb+srv://srishtiparulekar430:" +
    process.env.MONGO_PASSWORD + 
    "@skillsetgocluster.tttbg.mongodb.net/?retryWrites=true&w=majority&appName=SkillSetGoCluster"
).then(() => {
    console.log("Connected to mongo!");
}).catch((err) => {
    console.log("Error occurred while connecting to mongo!");
    console.log(err);
});


//passport-jwt setup:

//jwt_payload : {identifier: userId}
let opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = "qwertyuiop";
passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    User.findOne({_id: jwt_payload.identifier}, function (err, user){
        if(err){
            done(err, false);
        }
        if(user){
            done(null, user);
        }
        else{
            done(null, false);
        }
    });
}));

app.get("/",(req,res)=>{
    res.send("I am working");
});

app.listen(8000, ()=>{
    console.log("Server running on port 8000");
});