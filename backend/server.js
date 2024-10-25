const express = require("express");
const passport = require("passport");

const ExtractJwt = require("passport-jwt").ExtractJwt;
const JwtStrategy = require("passport-jwt").Strategy;
const mongoose = require("mongoose");

require("dotenv").config(); //will require and then config the package
//the variables that we want to define will get defined. 

const authRoutes = require("./routes/auth");
const experienceRoutes = require("./routes/experience");
const skillRoutes = require("./routes/skill");
const projectRoutes = require("./routes/project");

const User = require("./models/User");
const app = express();

//to tell express that the request body is going to be in JSON format. 
app.use(express.json());

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
passport.use(
    new JwtStrategy(opts, async function (jwt_payload, done) {
        try {
            const user = await User.findOne({ _id: jwt_payload.identifier });
            if (user) {
                done(null, user);
            }
            else {
                done(null, false);
            }
        }
        catch (err) {
            if (err) {
                done(err, false);
            }
        }
    })
);

app.get("/", (req, res) => {
    res.send("I am working");
});

app.use("/auth", authRoutes); //tells express apart from the routes defined in this file
//we will also use the routes in the arguments. 
//first argument is the prefix to the route, second will be the routes object. 

app.use("/experience", experienceRoutes);
app.use("/skill", skillRoutes);
app.use("/project", projectRoutes);

app.listen(8000, () => {
    console.log("Server running on port 8000");
});