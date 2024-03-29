const asyncHandler = require('express-async-handler');
const User = require('../model/user');
const Expense = require('../model/expense');


const createDashboard = asyncHandler(async (req,res)=>{
       let data = [];
       try{
             const leaderboardofusers = await User.find({})
                                        .select('id email total_cost')
                                        .sort({total_cost:-1})
                                        .limit(5);
             console.log(leaderboardofusers);
             res.status(200).json({leaderboardofusers})
       }catch(error){
        console.log(error);
        res.status(400);
        throw new Error(error);
       }
})

module.exports = {createDashboard};


/*
const createDashboard = asyncHandler(async (req,res)=>{
       let data = [];
       try{
             const leaderboardofusers = await User.findAll({
                attributes:['id','email','total_cost'],
                group:['user.id'],
                order:[['total_cost', 'DESC']],
                limit:5
              
             })
             console.log(leaderboardofusers);
             res.status(200).json({leaderboardofusers})
       }catch(error){
        console.log(error);
        res.status(400);
        throw new Error(error);
       }
})

module.exports = {createDashboard};
*/