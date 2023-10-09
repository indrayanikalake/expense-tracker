const {DataTypes} = require("sequelize");
const sequelize = require("../util/database");

const Expense = sequelize.define({
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
    Category:{
        type:DataTypes.STRING,
        allowNull:false
    },
    date:{
        type:DataTypes.DATE,
        allowNull:false
    }

})