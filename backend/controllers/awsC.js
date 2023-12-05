const asyncHandler =  require('express-async-handler');
const Expense = require('../models/expense');
const AWS = require('aws-sdk');
AWS.config.update({ region: 'ap-south-1' });

const uploadToS3 = asyncHandler(async ( data, fileName)=>{
    const BUCKET_NAME = process.env.AWS_BUCKET_NAME01;
    const IAM_USER_KEY = process.env.AWS_ACEESS_KEY_ID;
    const IAM_USER_SECRETE = process.env.AWS_SECRET_ACCESS_KEY;


    let s3Bucket = new AWS.S3({
        accessKeyId: IAM_USER_KEY,
        secretAccessKey: IAM_USER_SECRETE,

    });

    let params = {
        Bucket: BUCKET_NAME,
        Key: fileName,
        Body: data,
        ACL: "public-read"
    }


    return new Promise((resolve,reject)=>{
        s3Bucket.upload(params, (err, s3Response) => {
            if (err) {
                reject(err)

            } else{
                 resolve(s3Response.Location)
            }
        })
    })

})

const downloadExpense = asyncHandler( async (req,res)=>{
    
    try{
        const expenses = await Expense.find({userId:req.userId});

        const stringifyExpenses = JSON.stringify(expenses);
        const fileName = `expenses ${req.userId} ${new Date()}.txt`;
        const url = await uploadToS3(stringifyExpenses, fileName);
        console.log('s3Response >>>>>>', url)
        res.status(200).json({ url: url })

    }catch(error){
        console.log(error)
        res.status(500).json({ error: 'sorry something went wrong' })
    }

});


module.exports = {downloadExpense};