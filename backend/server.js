const express = require('express');
const cors = require('cors');
const router = require('./routes/router');
const expenseRouter = require('./routes/expenseRouter');
const paymentRouter = require('./routes/paymentRouter');
const premiumRouter = require('./routes/premiumRouter');
const sendEmailRouter = require('./routes/sendEmailRouter');
const downloadRouter = require('./routes/downloadRouter');
const sequelize = require('./util/database');
const dotenv = require('dotenv');
const User = require('./model/user');
const Expense = require('./model/expense');
const mongoose = require('mongoose');

dotenv.config();


const app = express();
app.use(cors());
app.use(express.json());


app.use('/user',router);
app.use('/expense',expenseRouter);
app.use('/premium/showDashboard', premiumRouter);
app.use('/password', sendEmailRouter);
app.use('/downloadexpense',downloadRouter);
app.use(paymentRouter);



mongoose.connect(process.env.MONGO_CONNECTION_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(7000, () => console.log('Server starts on localhost:7000'));
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









