const express = require('express');
const cors = require('cors');
const router = require('./routes/router');
const sequelize = require('./util/database');

//const sequelize = require('./util/database');

const app = express();
app.use(cors());
app.use(express.json());


app.use(router);

sequelize.sync()
.then(res=>
    {
       app.listen(7000, console.log('Server starts on 7000')); 
    }
)
.catch(err=>console.log(err));









