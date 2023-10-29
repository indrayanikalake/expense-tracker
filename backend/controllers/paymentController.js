const asyncHandler = require('express-async-handler');
const sequelize = require('../util/database');
const Order = require('../model/order');
const User = require('../model/user');
const crypto = require("crypto");
const RazorPay = require('razorpay');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();


const instance = new RazorPay({
    key_id:process.env.RAZORPAY_KEY,
    key_secret:process.env.RAZORPAY_SECRETE
})

const createOrder = asyncHandler(async (req,res)=>{
    console.log('hi');
   try{
    instance.orders.create(
        {amount:'5000', currency:"INR"},
        async (err, order)=>{
            if(err){
               
                throw new Error(err);}
            console.log("Orders:", order);
            try{
                await Order.create({
                    orderId: order.id,
                    status:"Pending",
           
                }
                )
            }catch(err){
            console.log(err);
            res.status(500).send("sorry payment request failed, not able to process the request successfully.");
            }           
            res.status(200).json({...order, key_id:instance.key_id})
        }
    )

   }catch(error){
      console.log(error);
        res.status(403)
        .json({ message: "client does not have the necessary permissions or authorization to access the requested resource or perform the requested action.",
         error: error });
   }
});


const verifyPayment = asyncHandler(async (req, res)=>{
    const session = await mongoose.startSession();
    session.startTransaction();
    
    const body =
      req.body.razorpay_order_id + "|" + req.body.razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", instance.key_secret)
      .update(body.toString())
      .digest("hex");

    if (expectedSignature === req.body.razorpay_signature) {
      try {
      await Order.updateOne( { orderId: req.body.razorpay_order_id },
          { $set: { status: 'SUCCESS' } }).session(session);

         const response = await User.updateOne({_id:req.userId},{$set:{isPremiumUser:true}}).session(session);
        console.log(response);
         await session.commitTransaction();
        session.endSession();
      } catch (error) {
        await session.abortTransaction();
        session.endSession();
        console.log(error)
      }
      res.status(200).json({ message: "payment sucessfull" });

    } else {
      res.status(500).json({ message: "payment failed" });
    }
})

module.exports = {createOrder,verifyPayment}