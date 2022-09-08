const {Sequelize,DataTypes}=require('sequelize')
const sequelize=require('../config/db')
const Choice = require('./Choice')

const Question=sequelize.define("question",{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false,
    },
    question:{
        type:DataTypes.TEXT,
        allowNull:false,
    },
},{
    timestamps:true,
})

Question.hasMany(Choice)
module.exports=Question