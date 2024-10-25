const express = require("express");
const router = express.Router();
const passport = require("passport");
const Experience = require("../models/Experience")
//middleware function passport.authenticate() will exe
//before the async function

router.post("/create", passport.authenticate("jwt", { session: false }), async (req, res) => {
    //identify the user, is the user valid

    //due to passport.authenticate() my req.user will get populated. 
    const user = req.user;
    //create the exp object 
    const { companyName, position, startDate, endDate, description } = req.body;
    if (!companyName, !position, !startDate, !endDate) {
        return res.status(402).json({ err: "Please fill all the details!" });
    }

    const experienceObject = { companyName, position, startDate, endDate, description };
    const experience = await Experience.create(experienceObject);
    //add experience to user, experience field of the user should hold all the experiences of that user
    user.experience.push(experience._id);
    await user.save();
    //return a response
    return res.status(200).json(experience);
});

module.exports = router;