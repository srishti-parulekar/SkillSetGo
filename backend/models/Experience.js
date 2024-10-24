const mongoose = require("mongoose");

const ExperienceSchema = new mongoose.Schema({
    companyName : {
        type: String, 
        required: true,
    },
    position : {
        type: String, 
        required: true,
    },
    startDate : {
        type: Date, 
        required: true,
    },
    endDate : {
        type: Date, 
        required: true,
    },
    description : {
        type: String, 
        required: false,
    },
});

const Experience = mongoose.model("Experience",ExperienceSchema);

module.exports = Experience;
