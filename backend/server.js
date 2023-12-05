const express = require('express');
const cors = require('cors');
const sequelize = require('./util/database');
const dotenv = require('dotenv');
const User = require('./models/user');
const Expense = require('./models/expense');
const mongoose = require('mongoose');
const { user, expense, premium, sendEmail, download, payment } = require('./routes');

dotenv.config();


const app = express();
app.use(cors());
app.use(express.json());


app.use('/user',user);
app.use('/expense',expense);
app.use('/premium/showDashboard', premium);
app.use('/password', sendEmail);
app.use('/downloadexpense',download);
app.use(payment);



mongoose.connect(process.env.MONGO_CONNECTION_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(3000, () => console.log('Server starts on localhost:7000'));
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });
  const db = mongoose.connection;



/*
sequelize.sync()
.then(res=>
    {
       app.listen(7000, console.log('Server starts on 7000')); 
    }
)
.catch(err=>console.log(err));
*/









