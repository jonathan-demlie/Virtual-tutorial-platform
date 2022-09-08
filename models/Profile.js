const {Sequelize,DataTypes}=require('sequelize');
const sequelize=require('../config/db')

const Profile=sequelize.define("profile",{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false,
    },
    headline:{
        type:DataTypes.STRING,
        allowNull:true,
    },
    phone:{
        type:DataTypes.STRING,
        allowNull:true,
    },
    price:{
        type:DataTypes.DOUBLE,
        allowNull:true,
    },
    address:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    gradeLevel:{
        type:DataTypes.STRING,
        allowNull:true,
    },
    img:{
        type:DataTypes.STRING,
        allowNull:true,
    },
    verify:{
        type:DataTypes.BOOLEAN,
        defaultValue:false,
        allowNull:false,
    }
},
{
    timestamps:true,
}
)

module.exports = Profile

