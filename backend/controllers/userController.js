const asyncHandler = require('express-async-handler');
const Bcrypt = require("bcryptjs");
const User = require('../model/user');
const generateToken = require('../config/generateToken');


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

const authUser = asyncHandler(async (req,res)=>{
    const {email, password} = req.body;

    const users = await  User.findAll({where:{email: email}});
    console.log(users[0]);
     const newPassword = await Bcrypt.compare(password, users[0].password)
    console.log(newPassword);

    if(!users){
       res.status(401).send('client is not authorized to access the requested resource')
    }else if(password && users[0].email === email){
        res.status(200).json({
            id:users[0].id,
            email:email,
            token:generateToken(users[0].id)
        })
    }else{
        res.status(400);
        throw new Error('Invalid Password');
    }

})

module.exports = {registerUser, authUser };