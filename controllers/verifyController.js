const sequelize = require('../config/db')
const User = require('../models/User')
const Verify =require('../models/Verify')

const create = async (req, res) => {
    const {userId,desc } = req.body
    const pdf=req.file.path
    if ((!desc) || (!pdf)) {
        res.status(400).json({
            data:req.body,
            message: "All fields are required!",
        })
    } else {

        try {
            const data = await Verify.create({
                userId,
                desc,
                pdf
            })
            if (data) {
                res.status(201).json({
                    message: "File submited successfully!",
                })
            } else {
                res.status(500).json({
                    message: "Something went wrong!"
                })
            }
        } catch (error) {
            res.status(500).json({
                message: "Internal server problem occured!"
            })
        }
    }
}


const fetchAll = async (req, res) => {
    try {
        const [data] = await sequelize.query(
            `SELECT * FROM verifies JOIN users ON verifies.userId = users.id`
        );
        if (data) {
            res.status(200).json({
                data,
                message: "File fetched successfully!",
            })
        } else {
            res.status(500).json({
                message: "Something went wrong!"
            })
        }
    } catch (error) {
        res.status(500).json({
            message: "Internal server problem occured!"
        })
    }
}

const remove=async(req,res)=>{
    const id=req.params.id
    try {
        const result= await Verify.destroy({
            where:{
                id
            }
        })

        if(result){
            res.status(200).json({
                message:"Data deleted successfully!"
            })
        }else{
            res.status(500).json({
                message:"Something went wrong!",
            })
        }

    } catch (error) {
        res.status(500).json({message:"Internal server problem!"})
    }
}


module.exports={
    create,
    fetchAll,
    remove
}