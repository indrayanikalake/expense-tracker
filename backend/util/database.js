const Sequelize = require("sequelize");


const sequelize = new Sequelize("expensetracker","root","Kalake@13",{ dialect:"mysql",host:"localhost"});

module.exports = sequelize;