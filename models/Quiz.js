const {Sequelize,DataTypes}=require('sequelize')
const sequelize=require('../config/db')
const Question = require('./Question')

const Quiz=sequelize.define("quiz",{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false,
    },
    uniqueId:{ 
        type:DataTypes.STRING,
        allowNull:false,
        unique:true,
    },
    title:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    desc:{
        type:DataTypes.TEXT,
        allowNull:false,
    },

},{
    timestamps:true,
})
Quiz.hasMany(Question)

module.exports=Quiz