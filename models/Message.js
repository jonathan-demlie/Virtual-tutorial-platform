const {Sequelize,DataTypes}=require('sequelize')
const sequelize=require('../config/db')

const Message=sequelize.define("message",{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false,
    },
    text:{
        type:DataTypes.TEXT,
        allowNull:true,
    }
},
{
    timestamps:true,
}
)
module.exports=Message