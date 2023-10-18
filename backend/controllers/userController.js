const asyncHandler = require('express-async-handler');
const Bcrypt = require("bcryptjs");
const User = require('../model/user');
const generateToken = require('../config/generateToken');
const sequelize = require('../util/database');


const registerUser = asyncHandler(async(req,res)=>{
    const transactionObj = await sequelize.transaction();
    const { email, password } = req.body;
    console.log(email, password);

    const userExists = await User.findAll(
      { where: { email: email } },
      { transaction: transactionObj }
    );

    if (userExists.length === 0){
    const bcryptedPassword = await Bcrypt.hash(password,10);
    try{
        await User.create({
            email, password:bcryptedPassword, total_cost:0
        })
        await transactionObj.commit();
        res.status(200).send('successful');

    }catch(error){
        await transactionObj.rollback();
        res.status(400);
        throw new Error(error);
    } 
}else{
    res.status(409).send('user is already registered');
}

})

const authUser = asyncHandler(async (req,res)=>{
    const {email, password} = req.body;

    const users = await  User.findAll({where:{email: email}});
    console.log(users[0]);
     const newPassword = await Bcrypt.compare(password, users[0].password);
    console.log("newPassword : ", newPassword);

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


const getUser = asyncHandler(async (req,res)=>{
    try{
            const response = await User.findAll({where:{id:req.userId}})
            console.log(response);
            res.status(200).send(response);
    }catch(error){
        res.status(400);
        throw new Error(error);
    }
})


module.exports = {registerUser, authUser,getUser };