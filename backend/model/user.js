const {DataTypes} = require('sequelize');
const sequelize = require('../util/database');


const User = sequelize.define('user',{
        id:{
        type: DataTypes.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true,
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false
    },
   password:{
        type:DataTypes.STRING,
        allowNull:false
    },
})

module.exports = User;