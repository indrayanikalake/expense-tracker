const asyncHandler = require('express-async-handler');
const Bcrypt = require("bcryptjs");
const User = require('../model/user');
const generateToken = require('../config/generateToken');
const sequelize = require('../util/database');


const registerUser = asyncHandler(async(req,res)=>{
  
    const { email, password } = req.body;
    console.log(email, password);
    
    const session = await User.startSession();
    session.startTransaction();

    const userExists = await User.findOne({email});
   console.log(userExists)
    if (!userExists){
    const bcryptedPassword = await Bcrypt.hash(password,10);
    try{
       const newUser =  new User({
            email, password:bcryptedPassword, total_cost:0
        })
        await newUser.save();
        await session.commitTransaction();
        session.endSession();
        res.status(200).send('successful');

    }catch(error){
        await session.abortTransaction();
        session.endSession();
        res.status(400);
        throw new Error(error);
    } 
}else{
     await session.abortTransaction();
     session.endSession();
    res.status(409).send('user is already registered');
}

})

const authUser = asyncHandler(async (req,res)=>{
    const {email, password} = req.body;

    const users = await  User.find({email});
    console.log(users[0]);
     const newPassword = await Bcrypt.compare(password, users[0].password);
    console.log("newPassword : ", newPassword);

    if(!users){
       res.status(401).send('client is not authorized to access the requested resource')
    }else if(password && users[0].email === email){
        res.status(200).json({
            id:users[0]._id,
            email:email,
            token:generateToken(users[0]._id)
        })
    }else{
        res.status(400);
        throw new Error('Invalid Password');
    }

})


const getUser = asyncHandler(async (req,res)=>{
    const userId = req.userId;
    try{
            const response = await User.findById(userId)
            console.log(response);
             if (!response) {
            return res.status(404).json({ message: 'User not found' });
             }
            res.status(200).send(response);
    }catch(error){
        console.log(error);
        res.status(500).json({message:'Server error'});

    }
})


module.exports = {registerUser, authUser,getUser };