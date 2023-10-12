const asyncHandler = require('express-async-handler');
const Expense = require('../model/expense');
const User = require('../model/user');

const postExpense = asyncHandler(async (req, res)=>{
const {  expense, description, category, date } = req.body;
console.log(expense, description, category, date);
console.log(req.userId);
try{
    const response = await Expense.create({
        userId:req.userId,
        expense, 
        description, 
        category, 
        date

    })
    
   const user = await User.findAll( 
    
    {where:{id: req.userId }}
    );

   await User.update(
   { total_cost: user[0].total_cost + Number(req.body.expense) },
   {where:{id:req.userId}});
    res.status(200).send("successful");

}catch(err){
    console.log(err.message);
    
    res.status(400);
    throw new Error('sorry, data is not added ')

}

})

const getExpense = asyncHandler(async (req,res)=>{
    console.log('hallo');
try{
    const data = await Expense.findAll({where:{userId: req.userId}});
    console.log(data);
    res.status(200).send(data);
}catch(error){
    console.log(error);
    res.status(400);
    throw new Error(error.message);
}
})

module.exports ={ postExpense , getExpense };