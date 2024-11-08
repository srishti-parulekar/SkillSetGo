const express = require("express");
const passport = require("passport");
const ExtractJwt = require("passport-jwt").ExtractJwt;
const JwtStrategy = require("passport-jwt").Strategy;
const mongoose = require("mongoose");
const cors = require("cors"); // Added cors package

require("dotenv").config();

const authRoutes = require("./routes/auth");
const experienceRoutes = require("./routes/experience");
const skillRoutes = require("./routes/skill");
const projectRoutes = require("./routes/project");

// New route imports for interviewer and applications
const interviewerRoutes = require("./routes/interviewer");

const User = require("./models/User");
const app = express();

// Enable CORS for all routes
app.use(cors()); // Added CORS middleware

app.use(express.json());

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

// Passport-JWT setup
let opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET || "qwertyuiop"; // Use environment variable for JWT secret

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

app.use("/auth", authRoutes);
app.use("/experience", experienceRoutes);
app.use("/skill", skillRoutes);
app.use("/project", projectRoutes);

// New routes for interviewer and applications
app.use('/api/interviewer', interviewerRoutes);

const PORT = process.env.PORT || 8000; // Use environment variable for port

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});