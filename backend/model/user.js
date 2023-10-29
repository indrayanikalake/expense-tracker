//const {DataTypes} = require('sequelize');
//const sequelize = require('../util/database');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
        minLength:3
    },
    isPremiumUser:{
        type:Boolean,
        default:false,
    },
    total_cost:{
        type:Number
    },
})

module.exports = mongoose.model("user", UserSchema);

/*
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
    isPremiumUser:{
        type:DataTypes.BOOLEAN,
    },
    total_cost:{
        type:DataTypes.BIGINT
    }
  
})

module.exports = User;
*/

