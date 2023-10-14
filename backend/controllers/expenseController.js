const asyncHandler = require('express-async-handler');
const Expense = require('../model/expense');
const User = require('../model/user');
const sequelize = require('../util/database');


const postExpense = asyncHandler(async (req, res)=>{
     const transactionObj = await sequelize.transaction();
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

    },{transaction: transactionObj})
    
   const user = await User.findAll( 
    
    {where:{id: req.userId }}
    );

   await User.update(
   { total_cost: user[0].total_cost + Number(req.body.expense) },
   {where:{id:req.userId}, transaction : transactionObj},
   
   );

   await transactionObj.commit();
   console.log(response);
    res.status(200).send("successful");

}catch(err){
    await transactionObj.rollback();
    console.log(err.message);
    
    res.status(400);
    throw new Error('sorry, data is not added ')

}

})

const getExpense = asyncHandler(async (req,res)=>{
    console.log('hallo');
try{
    const page = req.query.page ? Number(req.query.page) : 1;
    const size = req.query.size ? Number(req.query.size): 5;
    const skip = (page-1)*size;

    const total = await Expense.count({where:{userId: req.userId}});

    const data = await Expense.findAll({
        where:{userId: req.userId},
        offset:skip,
        limit:size
});

    console.log(data);
    res.status(200).json({data, total, page , size});

}catch(error){
    console.log(error);
    res.status(400).send(error);
    throw new Error(error.message);
}
})

const updateExpense = asyncHandler(async (req,res)=>{
    const transactionObj = await sequelize.transaction();
    const  {expense, description, category, date} = req.body;
    console.log(expense, description, category , date);
     try{
        await Expense.update(
            {expense : expense , description:description , category:category, date:date},
            {where:
            {userId : req.userId,
            id:req.params.id
            }, 
            transaction : transactionObj
            }
            );
            await transactionObj.commit();
            res.status(200).send('successful');

     }catch(error){
        await transactionObj.rollback();
        console.log(error);
        res.status(400);
        throw new Error('sorry, data is not updated')

     }
})

const deleteExpense = asyncHandler(async (req,res)=>{
    const transactionObj = await sequelize.transaction();
    try{
      const user = await User.findAll({where:{id:req.userId}});

      const expense = await Expense.findAll( { where: { id: req.params.id } } && {
          where: { userId: req.userId, id: req.params.id }
          
        });

     await User.update({
        total_cost:user[0].total_cost - expense[0].expense
      },
      {where:{id:req.userId}, transaction: transactionObj});


     await Expense.destroy(
        { where: { id: req.params.id } } && {
          where: { userId: req.userId, id: req.params.id },
          transaction: transactionObj,
        }
      );

      await transactionObj.commit();

      res.status(200).send("Expense Deleted Successfully.");

    }catch(error){
        await transactionObj.rollback();
        console.log(error);
        res.status(400);
        throw new Error(error)
    }
})

module.exports ={ postExpense , getExpense, updateExpense,deleteExpense };