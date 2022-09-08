const Payment = require('../models/Payment')
const User = require('../models/User')
const pay = async (req, res) => {
    const { scheduleId } = req.body
    const sch = await Payment.findOne({
        where: {
            scheduleId,
        }
    })
    if (sch) {
        res.status(401).json({
            message: "Payment already done"
        })
    } else {
        try {
            const result = await Payment.create(req.body)
            if (result) {
                res.status(200).json({ Body: 'verified' })
            } else {
                res.status(500).json({
                    message: "Something went wrong"
                })
            }
        } catch (error) {
            res.status(500).json({
                message: "Something went wrong!",
            })
        }
    }
}

const show = async (req, res) => {

}

const fetchAll = async (req, res) => {
    try {
        const result = await Payment.findAll({
            include: [{
                model: User,
                as: 'Sender',
            }, {
                model: User,
                as: "Reciever"
            }]
        })
        if (result) {
            res.status(200).json({
                data: result,
                message: "Payment fetched successfully"
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

const fetchTutor = async (req, res) => {
    const recieverId = req.params.id
    try {
        const result = await Payment.findAll({
            where: {
                recieverId,
            },
            include: [{
                model: User,
                as: 'Sender',
            }, {
                model: User,
                as: "Reciever"
            }]
        })
        if (result) {
            res.status(200).json({
                data: result,
                message: "Payment fetched successfully"
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

const update = async (req, res) => {
    const id = req.params.id
    try {
        const result = await Payment.update(req.body, {
            where: {
                scheduleId: id
            }
        })
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong!",
        })
    }
}
module.exports = {
    pay,
    show,
    fetchTutor,
    fetchAll,
    update
}