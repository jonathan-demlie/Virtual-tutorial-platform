const Choice=require('../models/Choice')


const create = async (req, res) => {
    const {choice,questionId,answer} =req.body
    if(!choice){
        res.status(409).json({
            message:"All fields are required!"
        })
    }
    try {
        const result = await Choice.create({ 
            questionId,
            choice,
            answer,
        });
        if (result) {
            res.status(201).json({
                data:result,
                message: 'Choice Added successfully',
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

// const fetchAll=async(req,res)=>{
//     const questionId=req.params.id
//     try {
//         const result=await Choice.findAll({
//             where:{
//                 questionId,
//             }
//         })
        
//         if(result){
//             res.status(200).json({
//                 data:result,
//                 message:"All  fetched successfully!"
//             })
//         }else{
//             res.status(500).json({
//                 message:"No Questions with this Quiz id"
//             })
//         }
//     } catch (error) {
//         res.status(500).json({
//             message:"Internal server problem",
//             error
//         })
//     }
// }

// const show=async(req,res)=>{
//     const id=req.params.id
//     try {
//         const result=await Question.findOne({
//             where:{
//                 id,
//             }
//         })
//         if(result){
//             res.status(200).json({
//                 data:result,
//                 message:"Question fetched successfully!"
//             })
//         }else{
//             res.status(500).json({
//                 message:"No Question with this id"
//             })
//         }
//     } catch (error) {
//         res.status(500).json({
//             message:"Internal server problem",
//             error
//         })
//     }
// }

// const update=async(req,res)=>{
//     const id=req.params.id
//     try {
//         const result=await Quiz.update(req.body,{
//             where:{
//                 id
//             }
//         })

//         if(result){
//             res.status(200).json({
//                 message:"Quiz updated successfully"
//             })
//         }else{
//             res.status(500).json({
//                 message:"Quiz not updated!"
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
//         const result=await Question.destroy({
//             where:{
//                 id
//             }
//         })
//         if(result){
//             res.status(200).json({
//                 message:"Question deleted successfully!",
//             })
//         }else{
//             res.status(400).json({
//                 message:"No Question with this id",
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
}