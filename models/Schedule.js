const {Sequelize,DataTypes}=require('sequelize');
const sequelize=require('../config/db')
const User=require('./User')
const Schedule=sequelize.define("schedule",{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false,
    },
    title:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    startDate:{
        type:DataTypes.DATE,
        allowNull:false,
    },
    endDate:{
        type:DataTypes.DATE,
        allowNull:false,
    },
    desc:{
        type:DataTypes.STRING,
        allowNull:true,
    },
    status:{
        type:DataTypes.STRING,
        defaultValue:'pending',
        allowNull:false,
    }
},
{
    timestamps:true,
}
)
module.exports = Schedule