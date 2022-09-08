const express=require('express')
const router=express.Router()
const {create} =require('../controllers/choiceController')

router.post('/choice',create)

module.exports=router