const {Sequelize,DataTypes} =require('sequelize')
const sequelize=require('../config/db')

const Payment=sequelize.define('payment',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false,
    },
    totalAmount:{
        type:DataTypes.DOUBLE,
        allowNull:false,
    },
    status:{
        type:DataTypes.STRING,
        allowNull:false,
        defaultValue:"pending"
    },
},
{
timestamps:true,
}
)
module.exports=Payment