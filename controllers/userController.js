require('dotenv').config();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Profile = require('../models/Profile');
const Education = require('../models/Education');
const About = require('../models/About');
const Token = require('../models/Token');
const crypto = require('crypto')
const nodemailer=require('nodemailer')

const register = async (req, res) => {
    const { firstName, lastName, email, password, role } = req.body;
    if (!(firstName || lastName || email || password)) {
        res.status(400).json({ message: "Fields can't be empty!" });
    } else {

        try {
            const result = await User.findOne({
                where: {
                    email: email
                }
            })
            if (result) {
                res.status(400).json({
                    message: 'User already exists!',
                });
            } else {
                var salt = bcrypt.genSaltSync(10);
                var hash = bcrypt.hashSync(password, salt);
                const user = await User.create({
                    firstName,
                    lastName,
                    email,
                    password: hash,
                    role,
                });

                if (user) {
                    jwt.sign({
                        id: user.id,
                    }, process.env.TOKEN_KEY, function (err, token) {
                        res.status(201).json({
                            data: user,
                            token,
                        });
                    }
                    )
                } else {
                    res.status(500).json({
                        message: 'Something went wrong!',
                    });
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

const login = async (req, res) => {
    const { email, password } = req.body;

    if (!(email && password)) {
        res.status(400).json({
            message: "All fields are required!",
        })
    } else {
        try {
            const result = await User.findOne({
                where: {
                    email: email,
                }
            });
            if (!result) {
                res.status(401).json({
                    message: "Invalid Credentials!",
                })
            } else {
                bcrypt.compare(password, result.password, function (err, data) {
                    if (err) {
                        res.status(500).json({
                            message: "Something went wrong!",
                        });
                    } else if (data) {
                        const token = jwt.sign({
                            id: result.id,
                        },
                            process.env.TOKEN_KEY, function (err, token) {
                                res.status(200).json({
                                    data: result,
                                    token: token,
                                });
                            });
                    } else {
                        res.status(401).json({
                            message: 'Invalid password!',
                        })
                    }
                })
            }
        } catch (error) {
            res.status(500).json({
                message: "Internal server problem",
                error: error,
            })
        }
    }
}
const fetchAll = async (req, res) => {
    try {
        const users = await User.findAll({
            include: Profile
        })
        if (users) {
            res.status(200).json({
                data: users,
                message: "users fetched successfully!"
            })
        } else {
            res.status(500).json({
                message: "Internal server problem!"
            })
        }
    } catch (error) {
        res.status(500).json({
            message: "something went wrong!"
        })
    }
}

const fetchTutor = async (req, res) => {
    try {
        const users = await User.findAll({
            where: {
                role: "tutor"
            },
            include: Profile
        })
        if (users) {
            res.status(200).json({
                data: users,
                message: "users fetched successfully!"
            })
        } else {
            res.status(500).json({
                message: "Internal server problem!"
            })
        }
    } catch (error) {
        res.status(500).json({
            message: "something went wrong!"
        })
    }
}

const show = async (req, res) => {
    const id = req.params.id
    try {
        const user = await User.findOne({
            where: {
                id
            },
            include: [{ model: Profile }, { model: Education }, { model: About }]
        })
        if (user) {
            res.status(200).json({
                data: user,
                message: "user fetched successfully!"
            })
        } else {
            res.status(500).json({
                message: "Internal server problem!"
            })
        }
    } catch (error) {
        res.status(500).json({
            message: "something went wrong!"
        })
    }
}

const homeTutor = async (req, res) => {
    try {
        const users = await User.findAll({
            where: {
                role: "tutor"
            },
            include: Profile,
            limit: 5,
        },
        )
        if (users) {
            res.status(200).json({
                data: users,
                message: "users fetched successfully!"
            })
        } else {
            res.status(500).json({
                message: "Internal server problem!"
            })
        }
    } catch (error) {
        res.status(500).json({
            message: "something went wrong!"
        })
    }
}

const forgotPassword = async (req, res) => {
    const { email } = req.body
    try {
        const user = await User.findOne({
            where: {
                email
            }
        })
        if (user) {
            let token = await Token.findOne({
                where: {
                    userId: user.id,
                }
            })

            if (!token) {
                token = await new Token({
                    userId: user.id,
                    token: crypto.randomBytes(32).toString('hex')
                }).save()
            }
            if (token) {
                const link=`http:localhost:3000/password-reset/${user.id}/${token}`
                const transporter = nodemailer.createTransport('SMTP',{
                    service: 'gmail',
                    host: 'smtp.gmail.com',
                    auth: {
                        user: 'getas.walelign@gmail.com',
                        pass: 'GETtowork@23',
                    },
                });
        
                const mailRes=await transporter.sendMail({
                    from: 'getas.walelign@gmail.com',
                    to: 'gurabicha36@gmail.com',
                    subject: "Forgot password",
                    text: link,
                });
                res.status(200).json({
                    data: token,
                    mailRes,
                    message: "successfully created!",
                })
            }
        } else {
            res.status(404).json({
                message: "User not found with this email address!"
            })
        }
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong!"
        })
    }
}

module.exports = {
    register,
    login,
    forgotPassword,
    fetchAll,
    fetchTutor,
    homeTutor,
    show,
}