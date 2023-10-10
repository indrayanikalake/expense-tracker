const {DataTypes} = require("sequelize");
const sequelize = require("../util/database");

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
module.exports = Expense