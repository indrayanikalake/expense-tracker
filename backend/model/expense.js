/*const {DataTypes} = require("sequelize");
const sequelize = require("../util/database");*/

const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ExpenseSchema = new Schema({

    expense :{
        type:String,
        required:true,
    },

    description:{
        type:String,
        required:true,
    },

    category:{
        type:String,
        required:true,
    },

    date:{
        type:Date,
        required:true,
    },

    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
})


module.exports = mongoose.model("Expense",ExpenseSchema);



/*
const Expense = sequelize.define('expense',{
    id:{
        type: DataTypes.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true,
    },
    expense:{
        type:DataTypes.BIGINT,
        allowNull:false
    },
    description:{
        type:DataTypes.STRING,
        allowNull:false
    },
    category:{
        type:DataTypes.STRING,
        allowNull:false
    },
    date:{
        type:DataTypes.STRING,
        allowNull:false
    }

});
module.exports = Expense;
*/