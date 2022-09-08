const Education = require('../models/Education')

const create = async (req, res) => {
    const { userId, school, field, start, end, grade, desc } = req.body
    if ((!userId) || (!school) || (!field) || (!start) || (!end)) {
        res.status(409).json({
            message: "All fields are required!"
        })
    }
    try {
        const result = await Education.create({
            userId,
            school,
            field,
            grade,
            start,
            end,
            desc,
        });
        if (result) {
            res.status(201).json({
                data: result,
                message: 'Education created successfully',
            });
        } else {
            res.status(500).json({
                message: "Education doesn't created successfully"
            })
        }

    } catch (err) {
        res.status(500).json({
            message: "Internal server problem!",
            error: err,
        })
    }
};

const show = async (req, res) => {
    const id = req.params.id
    try {
        const result = await Education.findOne({
            where: {
                userId: id
            }
        })
        if (result) {
            res.status(200).json({
                data: result,
                message: "Education fetched successfully"
            })
        } else {
            res.status(500).json({
                message: "No education with this id"
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

        const result = await Education.update(req.body, {
            where: {
                userId: id
            }
        })
        if (result) {
            // const res = await Education.findOne({
            //     where: {
            //         userId: id
            //     }
            // })
            res.status(200).json({
                message: "Education updated successfully"
            })
        } else {
            res.status(500).json({
                message: "Education not updated!"
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
        const result = await Education.destroy({
            where: {
                userId: id
            }
        })
        if (result) {
            res.status(200).json({
                message: "Education deleted successfully!",
            })
        } else {
            res.status(400).json({
                message: "No education with this id",
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
    show,
    update,
    remove
}