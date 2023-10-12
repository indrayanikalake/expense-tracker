const {DataTypes} = require('sequelize');
const sequelize = require('../util/database');
const User = require('./user');


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

User.hasMany(ForgetPasswordRequest);
ForgetPasswordRequest.belongsTo(User);

module.exports = ForgetPasswordRequest;