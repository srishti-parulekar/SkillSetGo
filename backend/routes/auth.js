const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcrypt");

const { getToken } = require("../utils/helpers");

// in server.js we are calling express as a whole 
//we dont need all those features
//here we only need its routing

const router = express.Router();

router.post("/register", async (req,res) =>{
    //this is the function that will handle registered user logic

    //we will get details of the user from req.body
    //we will check for a user with that email, not allowed
    //this is a new user request, now create the user

    const{firstName, lastName, email, password} = req.body;
    if(!firstName || !password){
        return res.status(400).json({err: "Invalid request body!"});
    }
    const existingUser = await User.findOne({email: email});
        if(existingUser){
            return res.status(402)
            .json({err: "A user with this mail already exists!"});
        }
    //taking user pass at time of registration, using hashing algo from bcrypt to encrypt it,
    //saving encrypted pass in db. when user tries to sign in, using same pass to encrypt his entry
    //if same encrypted pass generated as one in db, user is authenticated. 
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUserDetails = {firstName, lastName, email, password:hashedPassword};
    const newUser = await User.create(newUserDetails);

    //can use the new user to create jwt and return token to user.  

    const token = await getToken(email, newUser);

    //we want to return the following to the user: the actual user created, the token

    const userToReturn = {...newUser.toJSON(), token};
    delete userToReturn.password;
    return res.status(200).json(userToReturn);

});

router.post("/login", async (req,res) =>{
    //we get the details from the req.body.
    const {email, password} = req.body;
    if(!email || !password){
        return res.status(401).json({err: "Invalid email or password!"});
    }
    //verify if a user exists with that email 
    const user = await User.findOne({email:email});
    if(!user){
        return res.status(401).json({err: "Invalid email or password!"});
    }
    //verify if the password provided by user is corrected
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid){
        return res.status(401).json({err: "Invalid email or password!"});
    }
    //authenticated: generate a token for user and return.
    const token = await getToken(email, user);
    const userToReturn = {...user.toJSON(), token};
    delete userToReturn.password;
    return res.status(200).json(userToReturn);
});

module.exports = router;