exports = {};
const jwt = require("jsonwebtoken");

exports.getToken = (email, user) =>{
    const token = jwt.sign({identifier: user._id}, "qwertyuiop");
    return token;
}