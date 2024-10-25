const mongoose = require("mongoose");

// we create a schema and then we convert the schema into a model. 
//mongoose creates the model from the schema directly. 

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    experience: [
        {
            //more relevant than storing id as string
            //since this populates the experience object inside
            //the user object itself
            type: mongoose.Schema.Types.ObjectId,
            //ref tells which model or schema the id belongs to
            ref: "Experience",
        },
    ],
    projects: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Project",
        },
    ],
    skills: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Skill",
        },
    ],

});

//to convert the schema into a model:

const User = mongoose.model("User",UserSchema);
//users

module.exports = User;