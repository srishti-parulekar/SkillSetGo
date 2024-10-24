const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({
    projectName : {
        type: String, 
        required: true,
    },
    description : {
        type: String, 
        required: false,
    },
    links:[
        {
            type:"String",
        },
    ],
});

const Project = mongoose.model("Project",ProjectSchema);

module.exports = Project;
