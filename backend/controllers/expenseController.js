const asyncHandler = require('express-async-handler');
const Expense = require('../model/expense');
const User = require('../model/user');
const sequelize = require('../util/database');


const postExpense = asyncHandler(async (req, res)=>{
const session = await  Expense.startSession();
session.startTransaction();
const {  expense, description, category, date } = req.body;
console.log(expense, description, category, date);
console.log(req.userId);
try{
    const responseDoc =new Expense({
        userId:req.userId,
        expense, 
        description, 
        category, 
        date

    });

    const response = await responseDoc.save();
    
   const user = await User.findById(req.userId);
   user.total_cost += Number(req.body.expense);
   await user.save();

  /* await User.update(
   { total_cost: user[0].total_cost + Number(req.body.expense) },
   {where:{id:req.userId}, transaction : transactionObj},
   
   );*/

    await session.commitTransaction();
    session.endSession();
   console.log(response);
    res.status(200).send("successful");

}catch(err){
    await session.abortTransaction();
    session.endSession();
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

    const total = await Expense.countDocuments({userId: req.userId});

    const data = await Expense.find({userId: req.userId}).skip(skip).limit(size);

    console.log(data);
    res.status(200).json({data, total, page , size});

}catch(error){
    console.log(error);
    res.status(400).send(error);
    throw new Error(error.message);
}
})

const updateExpense = asyncHandler(async (req,res)=>{
    const session = await Expense.startSession();
    session.startTransaction();
    const  {expense, description, category, date} = req.body;
    console.log(expense, description, category , date);
     try{
       const updatedExpense = await Expense.findOneAndUpdate(
            {userId : req.userId,
            _id:req.params.id
            }, 
           {$set:{expense , description , category, date}},
            {new:true} //return updated document
            
            
            );
             if (!updatedExpense) {
                   await session.abortTransaction();
                 session.endSession();
               return res.status(404).send('Expense not found');
            }
            await session.commitTransaction();
            session.endSession();
             
            res.status(200).send('successful');

     }catch(error){
        await session.abortTransaction();
        session.endSession();
        console.log(error);
        res.status(400);
        throw new Error('sorry, data is not updated')

     }
})

const deleteExpense = asyncHandler(async (req,res)=>{
    const session = await mongoose.startSession();
    session.startTransaction();
    try{
      const user = await User.find({id:req.userId}).session(session);

      const expense = await Expense.findOneAndDelete({ userId: req.userId, id: req.params.id });

       if (!user || !expense) {
        await session.abortTransaction();
        session.endSession();
        return res.status(404).send("Expense or user not found");
    }

     user.total_cost -= expense.expense;
     await user.save({session});


    await session.commitTransaction();
    session.endSession();

      res.status(200).send("Expense Deleted Successfully.");

    }catch(error){
        await session.abortTransaction();
        session.endSession();
        console.log(error);
        res.status(400);
        throw new Error(error)
    }
})

module.exports ={ postExpense , getExpense, updateExpense,deleteExpense };