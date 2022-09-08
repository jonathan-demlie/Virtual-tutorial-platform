const {Sequelize,DataTypes}=require('sequelize')
const sequelize=require('../config/db')
const User = require('./User')

const About=sequelize.define("about",{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false,
    },
    content:{
        type:DataTypes.TEXT,
        allowNull:false,
    }
},
{
    timestamps:true,
},
)

module.exports=About