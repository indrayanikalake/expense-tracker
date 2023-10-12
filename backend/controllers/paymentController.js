const asyncHandler = require('express-async-handler');
const sequelize = require('../util/database');
const Order = require('../model/order');
const User = require('../model/user');
const crypto = require("crypto");
const RazorPay = require('razorpay');
const dotenv = require('dotenv');
dotenv.config();


const instance = new RazorPay({
    key_id:process.env.RAZORPAY_KEY,
    key_secret:process.env.RAZORPAY_SECRETE
})

const createOrder = asyncHandler(async (req,res)=>{
    console.log('hi');
   const transactionObj = await sequelize.transaction();
   try{
    instance.orders.create(
        {amount:'5000', currency:"INR"},
        async (err, order)=>{
            if(err){
                console.log(err);
                throw new Error(err);}
            console.log("Orders:", order);
            try{
                await Order.create({
                    orderId: order.id,
                    status:"Pending",
           
                },
                {transaction:transactionObj}
                )
                await transactionObj.commit();

            }catch(err){
            await transactionObj.rollback();
            console.log(err);
            res.status(500).send("sorry payment request failed, not able to process the request successfully.");
            }
            
            res.status(200).json({...order, key_id:instance.key_id})
        }
    )

   }catch(error){
      transactionObj.rollback();
      console.log(error);
        res.status(403)
        .json({ message: "client does not have the necessary permissions or authorization to access the requested resource or perform the requested action.",
         error: error });
   }
});


const verifyPayment = asyncHandler(async (req, res)=>{
    const transactionObj = await sequelize.transaction()
    
    const body =
      req.body.razorpay_order_id + "|" + req.body.razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", instance.key_secret)
      .update(body.toString())
      .digest("hex");

    if (expectedSignature === req.body.razorpay_signature) {
      try {
        await Order.update({status: 'SUCCESS'}, {where: { orderId: req.body.razorpay_order_id },transaction:transactionObj
        })

        await User.update({isPremiumUser:true},{where:{id:req.userId},transaction:transactionObj})

        await transactionObj.commit()
      } catch (error) {
        await transactionObj.rollback()
        console.log(error)
      }
      res.status(200).json({ message: "payment sucessfull" });

    } else {
      res.status(500).json({ message: "payment failed" });
    }
})

module.exports = {createOrder,verifyPayment}