const {Sequelize,DataTypes}=require('sequelize')
const sequelize=require('../config/db')
const Message = require('./Message')

const Conversation=sequelize.define("conversation",{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false,
    },
},
{
    timestamps:true,
}
)
Conversation.hasMany(Message)
module.exports=Conversation