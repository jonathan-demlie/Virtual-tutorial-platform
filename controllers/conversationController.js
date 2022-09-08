const Conversation = require('../models/Conversation')
const sequelize = require('../config/db');
const User = require('../models/User');

const create = async (req, res) => {
    const { senderId, recieverId } = req.body
    if ((!senderId) || (!recieverId)) {
        res.status(409).json({
            message: "All fields are required!"
        })
    } else {
        try {

            const con = await Conversation.findOne({
                where: {
                    senderId,
                    recieverId
                }
            })
            if (con) {
                res.status(400).json({
                    message: "Conversation already exists!",
                })
            } else {
                const result = await Conversation.create({
                    senderId,
                    recieverId,
                });
                if (result) {
                    res.status(201).json({
                        data: result,
                        message: 'Conversation created successfully!',
                    });
                } else {
                    res.status(500).json({
                        message: "Something went wrong!"
                    })
                }
            }
        } catch (err) {
            res.status(500).json({
                message: "Internal server problem!",
                error: err,
            })
        }
    }
};

const fetchAll = async (req, res) => {
    const senderId = req.params.id
    try {

        // const [result, metadata] = await sequelize.query(
        //     `SELECT * FROM conversations JOIN users ON conversations.recieverId = users.id WHERE conversations.senderId=${senderId} OR conversations.recieverId=${senderId}`
        // );
        const result = await Conversation.findAll({
            where: sequelize.or(
                {senderId },
                {recieverId:senderId}
            ),
            // include:User
            // where:{
            //     senderId:{
            //         [Op.or]: [senderId, recieverId]
            //       },
            //     recieverId:{
            //         [Op.or]: [senderId, recieverId]
            //       }
            // }
        })
        if (result) {
            res.status(200).json({
                data: result,
                message: "Conversation fetched successfully"
            })
        } else {
            res.status(500).json({
                message: "Something went wrong"
            })
        }
    } catch (error) {
        res.status(500).json({
            message: "Internal server problem",
            error
        })
    }
}

// const update=async(req,res)=>{
//     const id=req.params.id
//     try {
//         const result=await About.update(req.body,{
//             where:{
//                 userId:id
//             }
//         })

//         if(result){
//             res.status(200).json({
//                 message:"About section updated successfully"
//             })
//         }else{
//             res.status(500).json({
//                 message:"About not updated!"
//             })
//         }
//     } catch (error) {
//         res.status(500).json({
//             error,
//             message:"Inernal server problem"
//         })
//     }
// }

// const remove=async(req,res)=>{
//     const id=req.params.id
//     try {
//         const result=await About.destroy({
//             where:{
//                 userId:id
//             }
//         })
//         if(result){
//             res.status(200).json({
//                 message:"About deleted successfully!",
//             })
//         }else{
//             res.status(400).json({
//                 message:"No About with this id",
//             })
//         }
//     } catch (error) {
//         res.status(500).json({
//             message:"Internal server problem",
//             error
//         })
//     }
// }
module.exports = {
    create,
    fetchAll,
}