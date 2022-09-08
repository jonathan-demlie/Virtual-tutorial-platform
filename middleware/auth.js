const jwt = require('jsonwebtoken')
const User = require('../models/User')

const protect = async (req, res, next) => {
  let token
  let decoded
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(" ")[1]
      // Verify token
      decoded = jwt.verify(token, process.env.TOKEN_KEY)
      // Get user from the token
      req.user = await User.findOne({ 
        where:{
            id: decoded.id
        }
    })
      next()
    } catch (error) {
      res.status(401).json({
        message:"Not authorized",
      })
    }
  }

  if (!token) {
    res.status(401).json({
      message:"Not authorized, no token"
    })
  }
}

module.exports = { protect }
