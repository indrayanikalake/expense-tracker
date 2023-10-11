const {DataTypes} = require('sequelize');
const sequelize = require('../util/database');
const User = require('./user');


const Order = sequelize.define('order',{
    id:{
        type:DataTypes.BIGINT,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true,
    },
    orderId:DataTypes.STRING,
    status:DataTypes.STRING,
});

module.exports = Order;

User.hasMany(Order);
Order.belongsTo(User);