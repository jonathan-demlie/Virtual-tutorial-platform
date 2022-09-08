const {Sequelize,DataTypes}=require('sequelize')
const sequelize=require('../config/db')

const Verify=sequelize.define('verify',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false,

    },
    desc:{
        type:DataTypes.TEXT,
        allowNull:false,
    },
    pdf:{
        type:DataTypes.STRING,
        allowNull:false,
    }
},
{
    timestamps:true,
})

module.exports=Verify