const asyncHandler = require('express-async-handler');
const Sib = require('sib-api-v3-sdk');
const { v4: uuidv4 } = require("uuid");
const dotenv = require('dotenv');
const ForgetPasswordRequest = require('../model/ForgetPasswordRequst');
const User = require('../model/user');

dotenv.config();

const sendEmail =  asyncHandler(async (req,res)=>{

    const {email}= req.body;
    console.log(email);
    const isRegistered = await User.findAll({where:{email: email}});
    if (isRegistered.length === 0) {
      return res
        .status(404)
        .json({
          message: `Sorry no registered user found with email ${req.body.email}`,
        });
    }

    const client = Sib.ApiClient.instance;
     console.log("this is our smpt key", process.env.SMTP_KEY);
     let apiKey = (client.authentications["api-key"].apiKey =
      process.env.SMTP_KEY);

    const transactionEmailApi = new Sib.TransactionalEmailsApi();

    try{
        const uuid = uuidv4();

        const response = await ForgetPasswordRequest.create({
            uuid:uuid, isActive:true
        });

        const sender={
            email:"indrayanikalake13@gmail.com",
            name:"indrayani"
        }

        const receivers=[
            {
                email:email
            }
        ];

        transactionEmailApi.sendTransacEmail({
          sender,
          to: receivers,
          subject: "hi this is ganesh jadhav from ganesh jadhav gfx id",
          htmlContent: `<!DOCTYPE html>
          <html lang="en">
          <head>
              <meta charset="UTF-8">
              <meta http-equiv="X-UA-Compatible" content="IE=edge">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Password Reset</title>
          </head>
          <body style="font-family: Arial, sans-serif; padding: 20px;">
          
              <table style="max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd;">
                  <tr>
                      <td style="text-align: center;">
                          <h1>Password Reset</h1>
                      </td>
                  </tr>
                  <tr>
                      <td>
                          <p>Hello,</p>
                          <p>We received a request to reset the password associated with this email address. If you didn't initiate this request, you can safely ignore this email.</p>
                          <p>To reset your password, please click the button below:</p>
                          <p style="text-align: center;">
                              <a href="http://localhost:3000/resetpassword/${uuid}" style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: white; text-decoration: none; border-radius: 5px;">Reset Password</a>
                          </p>
                          <p>If the button doesn't work, you can also copy and paste the following link into your browser:</p>
                          <p>http://localhost:3000/resetpassword/${uuid}</p>
                         
                         
                          <p>Thank you,</p>
                          <p>The Start Expense Team</p>
                      </td>
                  </tr>
              </table>
          
          </body>
          </html>
          `,
        })
         .then(console.log)
        .catch(console.log);

          res.status(200).json({ message: "mail sended successfuly" });


    }catch(error){
       console.log(error);
      res
        .status(500)
        .json({ message: "sorry your reset password link can not be sent" });
    }

})

module.exports = sendEmail;