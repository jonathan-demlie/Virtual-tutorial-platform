const Question = require('../models/Question')


const create = async (req, res) => {
    const { question, quizId } = req.body
    if (!question) {
        res.status(409).json({
            message: "All fields are required!"
        })
    } else {

        try {
            const result = await Question.create({
                quizId,
                question,
            });
            if (result) {
                res.status(201).json({
                    data: result,
                    message: 'Question created successfully',
                });
            } else {
                res.status(500).json({
                    message: "Something went wrong!"
                })
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
    const quizId = req.params.id
    try {
        const result = await Question.findAll({
            where: {
                quizId,
            }
        })

        if (result) {
            res.status(200).json({
                data: result,
                message: "All Questions fetched successfully!"
            })
        } else {
            res.status(500).json({
                message: "No Questions with this Quiz id"
            })
        }
    } catch (error) {
        res.status(500).json({
            message: "Internal server problem",
            error
        })
    }
}

const show = async (req, res) => {
    const id = req.params.id
    try {
        const result = await Question.findOne({
            where: {
                id,
            }
        })
        if (result) {
            res.status(200).json({
                data: result,
                message: "Question fetched successfully!"
            })
        } else {
            res.status(500).json({
                message: "No Question with this id"
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

const remove = async (req, res) => {
    const id = req.params.id
    try {
        const result = await Question.destroy({
            where: {
                id
            }
        })
        if (result) {
            res.status(200).json({
                message: "Question deleted successfully!",
            })
        } else {
            res.status(400).json({
                message: "No Question with this id",
            })
        }
    } catch (error) {
        res.status(500).json({
            message: "Internal server problem",
            error
        })
    }
}
module.exports = {
    create,
    fetchAll,
    show,
    remove
}