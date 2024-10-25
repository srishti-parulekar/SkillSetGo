const mongoose = require("mongoose");

const SkillSchema = new mongoose.Schema({
    skillName : {
        type: String, 
        required: true,
    },
});

const Skill = mongoose.model("Skill",SkillSchema);

module.exports = Skill;
