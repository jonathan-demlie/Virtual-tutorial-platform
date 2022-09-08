const express=require('express')
const router=express.Router()
const {register,login,fetchTutor,fetchAll,homeTutor,show,forgotPassword}=require('../controllers/userController')

router.post('/register',register)
router.post('/login',login)
router.get('/users',fetchAll)
router.get('/tutors',fetchTutor)
router.get('/home-tutors',homeTutor)
router.get('/user/:id',show)
router.post('/forgot-password',forgotPassword)

module.exports=router