const express = require('express');
const cors = require('cors');
const router = require('./routes/router');
const sequelize = require('./util/database');
const dotenv = require('dotenv');

dotenv.config();


const app = express();
app.use(cors());
app.use(express.json());


app.use('/user',router);

sequelize.sync()
.then(res=>
    {
       app.listen(7000, console.log('Server starts on 7000')); 
    }
)
.catch(err=>console.log(err));









