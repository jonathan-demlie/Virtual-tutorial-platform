const {Sequelize,DataTypes}=require('sequelize')
const sequelize=require('../config/db')

const Choice=sequelize.define('choice',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
    },
    choice:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    answer:{
        type:DataTypes.BOOLEAN,
        defaultValue:false,
    }
},{
    timestamps:true,
})

module.exports=Choice