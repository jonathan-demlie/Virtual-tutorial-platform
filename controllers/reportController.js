const Report = require('../models/Report');
const User = require('../models/User');
const sequelize = require('../config/db')

const create = async (req, res) => {
    const { content, tutorId, studentId } = req.body
    if (!content) {
        res.status(409).json({
            message: "All fields are required!"
        })
    } else {

        try {
            const result = await Report.create({
                studentId,
                tutorId,
                content,
            });
            if (result) {
                res.status(201).json({
                    data: result,
                    message: 'Report submited successfully',
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
    // const tutorId=req.params.id
    try {
        const [result, metadata] = await sequelize.query(
            "SELECT * FROM reports JOIN users ON reports.tutorId = users.id "
        );
        if (result) {
            res.status(200).json({
                data: result,
                message: "Report fetched successfully!"
            })
        } else {
            res.status(500).json({
                message: "No report with this tutor id"
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
        const result = await Report.findOne({
            where: {
                id
            }
        })
        if (result) {
            res.status(200).json({
                data: result,
                message: "Report fetched successfully!"
            })
        } else {
            res.status(500).json({
                message: "No report with this id"
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
        const result = await Report.update(req.body, {
            where: {
                id
            }
        })

        if (result) {
            res.status(200).json({
                message: "Report updated successfully"
            })
        } else {
            res.status(500).json({
                message: "Report not updated!"
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
        const result = await Report.destroy({
            where: {
                id
            }
        })
        if (result) {
            res.status(200).json({
                message: "Report deleted successfully!",
            })
        } else {
            res.status(400).json({
                message: "No report with this id",
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