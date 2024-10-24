const express = require("express");
const passport = require("passport")
const { ExtractJwt, JwtStrategy } = require("passport-jwt");

const app = express();

//passport-jwt setup:

//jwt_payload : {identifier: userId}
let opts = {}
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