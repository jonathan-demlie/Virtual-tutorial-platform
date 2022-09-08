const {Sequelize,DataTypes}=require('sequelize')
const sequelize=require('../config/db')

const Report=sequelize.define("report",{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false,
    },
    content:{
        type:DataTypes.TEXT,
        allowNull:false,
    },

},{
    timestamps:true,
})
module.exports=Report