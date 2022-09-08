const {Sequelize,DataTypes}=require('sequelize')
const sequelize=require('../config/db')

const Education=sequelize.define("education",{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false,
    },
    school:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    field:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    start:{
        type:DataTypes.DATE,
        allowNull:false,
    },
    end:{
        type:DataTypes.DATE,
        allowNull:false,
    },
    grade:{
        type:DataTypes.DOUBLE,
        allowNull:true,
    },
    desc:{
        type:DataTypes.TEXT,
        allowNull:true,
    }

},
{
    timestamps:true,
}
)

module.exports=Education