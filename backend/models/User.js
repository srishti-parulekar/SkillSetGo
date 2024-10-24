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
            type: String,
        },
    ],
    projects: [
        {
            type: String,
        },
    ],
    skills: [
        {
            type: String,
        },
    ],

})

//to convert the schema into a model:

const User = mongoose.model("User",UserSchema);
//users

modules.exports = User;