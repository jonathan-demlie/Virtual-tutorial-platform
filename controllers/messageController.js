const Message=require('../models/Message')
const sequelize = require('../config/db')

const create = async (req, res) => {
    const {senderId,conversationId,text} =req.body
    if((!senderId)||(!conversationId)||(!text)){
        res.status(409).json({
            message:"All fields are required!"
        })
    }
    try {
        const result = await Message.create({ 
            senderId,
            conversationId,
            text
        });
        if (result) {
            res.status(201).json({
                data:result,
                message: 'Message send successfully!',
            });
        } else {
          res.status(500).json({
              message:"Something went wrong!"
          })
        }

    } catch (err) {
        res.status(500).json({
            message: "Internal server problem!",
            error: err,
        })
    }
};

const fetchAll=async(req,res)=>{
    const conversationId=req.params.id
    try {
        const result=await Message.findAll({
            where:{
                conversationId,
            }
        })
        if(result){
            res.status(200).json({
                data:result,
                message:"Conversation fetched successfully"
            })
        }else{
            res.status(500).json({
                message:"Something went wrong"
            })
        }
    } catch (error) {
        res.status(500).json({
            message:"Internal server problem",
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