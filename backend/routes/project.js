const express = require("express");
const router = express.Router();
const passport = require("passport")
const Project = require("../models/Project")

router.post("/create", 
    passport.authenticate(), 
    async (req,res) => {
        const user = req.user;
        
        //creating projectObject 
        const {projectName, description, links} = req.body;
        if(!projectName){
            return res.status(402).json({err:"Invalid details!"});
        }
        const projectObject = {projectName, description, links};
        const createdProject = await Project.create(projectObject);

        //adding the project to the user object
        user.projects.push(createdProject._id);
        await user.save();

        //returning a result to the user here
        return res.status(200).json(createdProject);
});

module.exports = router;