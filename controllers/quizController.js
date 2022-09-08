const Quiz = require('../models/Quiz')
const { v4: uuidv4 } = require('uuid');
const Question = require('../models/Question');
const Choice = require('../models/Choice');

const create = async (req, res) => {
    const { title, desc, userId } = req.body
    if (!(title && desc)) {
        res.status(409).json({
            message: "All fields are required!",
        })
    } else {
        try {
            const uniqueId = uuidv4()
            const result = await Quiz.create({
                userId,
                uniqueId,
                title,
                desc,
            });
            if (result) {
                res.status(201).json({
                    data: result,
                    message: 'Quiz created successfully',
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
    const userId = req.params.id
    try {
        const result = await Quiz.findAll({
            where: {
                userId,
            },
            include: { model: Question, include: { model: Choice } },
        })
        if (result) {
            res.status(200).json({
                data: result,
                message: "All Quizes fetched successfully!"
            })
        } else {
            res.status(500).json({
                message: "No Quiz with this tutor id"
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
    const uniqueId = req.params.id
    try {
        const result = await Quiz.findOne({
            where: {
                uniqueId,
            },
            include: { model: Question, include: { model: Choice } },
        })
        if (result) {
            res.status(200).json({
                data: result,
                message: "Quiz fetched successfully!"
            })
        } else {
            res.status(500).json({
                message: "No quiz with this id"
            })
        }
    } catch (error) {
        res.status(500).json({
            message: "Internal server problem",
            error
        })
    }
}

const update = async (req, res) => {
    const id = req.params.id
    try {
        const result = await Quiz.update(req.body, {
            where: {
                id
            }
        })

        if (result) {
            res.status(200).json({
                message: "Quiz updated successfully"
            })
        } else {
            res.status(500).json({
                message: "Quiz not updated!"
            })
        }
    } catch (error) {
        res.status(500).json({
            error,
            message: "Inernal server problem"
        })
    }
}

const remove = async (req, res) => {
    const id = req.params.id
    try {
        const result = await Quiz.destroy({
            where: {
                id
            }
        })
        if (result) {
            res.status(200).json({
                message: "Quiz deleted successfully!",
            })
        } else {
            res.status(400).json({
                message: "No quiz with this id",
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
    update,
    remove
}