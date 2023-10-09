const asyncHandler = require('express-async-handler');

const Bcrypt = require("bcryptjs");
const User = require('../model/user');

const registerUser = asyncHandler(async(req,res)=>{

    const { email, password } = req.body;
    console.log(email, password);
    const bcryptedPassword = await Bcrypt.hash(password,10);
    try{
        await User.create({
            email, password:bcryptedPassword
        })
        res.status(200).send('successful');

    }catch(error){
     res.status(400).send(error);
     throw new Error(error);
    } 

})

module.exports = {registerUser};