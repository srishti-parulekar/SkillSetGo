const express = require("express");
const router = express.Router();
const passport = require("passport")
const Skill = require("../models/Skill")
router.post("/create", 
    passport.authenticate(), 
    async (req,res) => {
        const user = req.user;
        
        //creating skillObject 
        const {skillName} = req.body;
        if(!skillName){
            return res.status(402).json({err:"Invalid details!"});
        }
        const skillObject = {skillName};
        const createdSkill = await Skill.create(skillObject);

        //adding the skill to the user object
        user.skills.push(createdSkill._id);
        await user.save();

        //returning a result to the user here
        return res.status(200).json(createdSkill);
});

module.exports = router;