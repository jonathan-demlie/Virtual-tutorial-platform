const {Sequelize,DataTypes}=require('sequelize')
const sequelize=require('../config/db')

const Review=sequelize.define("review",{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false,
    },
    rate:{
        type:DataTypes.INTEGER,
        allowNull:false,
    },
    content:{
        type:DataTypes.TEXT,
        allowNull:false,
    },

},{
    timestamps:true,
})

module.exports=Review