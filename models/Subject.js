const {Sequelize,DataTypes}=require('sequelize');
const sequelize=require('../config/db')

const Subject=sequelize.define("subject",{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false,
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    desc:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    img:{
        type:DataTypes.STRING,
        allowNull:false,
    },
},
{
    timestamps:true,
}
)

module.exports = Subject