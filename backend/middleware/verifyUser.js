const Jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');


const verifyUser = asyncHandler(async (req,res,next)=>{
let token;
console.log(req.headers);
if(req.headers.authorization && 
    req.headers.authorization.startsWith('Bearer')){
        try{
            token = req.headers.authorization.split(' ')[1];
            console.log(token);

            const verified = await Jwt.verify(token, process.env.JWT_SECRET);
            console.log(verified);
            req.userId = verified.id;
            console.log(req.userId);
            next();

        }catch(error){
            res.status(401);
          throw new Error("Not authorized, token failed");
        }
    }
})

module.exports = verifyUser;