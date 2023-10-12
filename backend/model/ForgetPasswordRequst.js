const {DataTypes} = require('sequelize');
const sequelize = require('../util/database');


const ForgetPasswordRequest = sequelize.define('forgetpassword',{
     id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        allowNull:false
    },
    uuid:{
        type:DataTypes.STRING,
        allowNull:false
    },
    isActive:{
        type:DataTypes.BOOLEAN,
        
    }
})

module.exports = ForgetPasswordRequest;