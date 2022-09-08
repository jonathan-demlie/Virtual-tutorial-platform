const Schedule = require('../models/Schedule');
const Sequelize = require('sequelize')
const User = require('../models/User')
const sequelize = require('../config/db');
const Profile = require('../models/Profile');

const create = async (req, res) => {
    const { title, startDate, endDate, desc, tutorId, studentId } = req.body

    if ((!title) || (!startDate) || (!endDate)) {
        res.status(400).json({
            message: "All fields are required!",
        })
    } else {

        try {
            const schedule = await Schedule.create({
                tutorId,
                studentId,
                title,
                endDate,
                startDate,
                desc,
            })
            if (schedule) {
                res.status(201).json({
                    message: "Schedule Submited successfully!",
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
    const userId = req.params.id
    try {
        
        const result = await Schedule.findAll({
            where: Sequelize.or(
                { tutorId: userId },
                { studentId: userId }
            ),include: [{
                model: User,
                as: 'TutorId',
                include:[Profile]
            }, {
                model: User,
                as: "StudentId"
            }]
        })
        if (result) {
            res.status(200).json({
                data: result,
                message: "Schedules fetched successfully"
            })
        } else {
            res.status(500).json({
                message: "Internal server problem"
            })
        }
    } catch (error) {
        res.status(500).json({
            message: "Internal server problem"
        })
    }
}

const show = async (req, res) => {
    const id = req.params.id
    try {
        
        const result = await Schedule.findAll({
            where:{
                id
            },
            include: [{
                model: User,
                as: 'TutorId',
                include:[Profile]
            }, {
                model: User,
                as: "StudentId"
            }]
        })
        if (result) {
            res.status(200).json({
                data: result,
                message: "Schedule fetched successfully"
            })
        } else {
            res.status(500).json({
                message: "Internal server problem"
            })
        }
    } catch (error) {
        res.status(500).json({
            message: "Internal server problem"
        })
    }
}

const accept = async (req, res) => {
    const id = req.params.id;

    try {
        const result = await Schedule.update(req.body, {
            where: {
                id
            }
        })

        if (result) {
            res.status(200).json({
                message: "Schedule accepted successfully."
            })
        } else {
            res.status(500).json({
                message: "No schedule with the specified ID!"
            })
        }
    } catch (error) {
        res.status(500).json({
            message: "Internal server problem!"
        })
    }
}

const remove = async (req, res) => {
    const id = req.params.id

    try {
        const result = await Schedule.destroy({
            where: {
                id
            }
        })
        if (result) {
            res.status(200).json({
                message: "Schedule deleted successfully!"
            })
        } else {
            res.status(500).json({
                message: "No schedule with the specified ID",
            })
        }
    } catch (error) {
        res.status(500).json({
            message: "Internal server problem!"
        })
    }
}

module.exports = {
    create,
    fetchAll,
    show,
    accept,
    remove,
}