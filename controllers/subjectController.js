const Subject = require('../models/Subject');

const create = async (req, res) => {
    const { name, desc } = req.body
    const img='http://localhost:5000/'+req.file.path

    if ((!name) || (!desc) || (!img)) {
        res.status(400).json({
            data:req.body,
            message: "All fields are required!",
        })
    } else {

        try {
            const subject = await Subject.create({
                name,
                desc,
                img
            })
            if (subject) {
                res.status(201).json({
                    message: "Subject created successfully!",
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
        const subjects = await Subject.findAll()
        if (subjects) {
            res.status(200).json({
                data: subjects,
                message: "subjects fetched successfully"
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

const fetchSome = async (req, res) => {
    try {
        const subjects = await Subject.findAll({
            limit:8,
        })
        if (subjects) {
            res.status(200).json({
                data: subjects,
                message: "subjects fetched successfully"
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
    const id = req.params.id;
    try {
        const result = await Subject.update(req.body, {
            where: {
                id
            }
        })

        if (result) {
            res.status(200).json({
                message: "Subject updated successfully"
            })
        } else {
            res.status(500).json({
                message: "No subject with this id!"
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
        const result = await Subject.destroy({
            where: {
                id
            }
        })
        if (result) {
            res.status(200).json({
                message: "Subject deleted successfully!"
            })
        } else {
            res.status(500).json({
                message: "No subject with this id",
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
    update,
    remove,
    fetchSome
}