const {DataTypes} = require('sequelize');
const sequelize = require('../util/database');
const User = require('./user');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ForgetPasswordRequestSchema = new Schema({
  uuid:{
    type:String,
    required:true,
  },

  isActive:{
    type:Boolean,
    default:false,
  },
})

module.exports = mongoose.model("ForgetPasswordRequest", ForgetPasswordRequestSchema);



/*
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
*/

/*
User.hasMany(ForgetPasswordRequest);
ForgetPasswordRequest.belongsTo(User);


module.exports = ForgetPasswordRequest;
*/