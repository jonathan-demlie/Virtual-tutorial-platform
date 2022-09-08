const express=require('express')
const router=express.Router()

const {create,fetchAll,show,update,remove} =require('../controllers/quizController')

router.post('/quiz',create)
router.get('/quizzes/:id',fetchAll)
router.get('/quiz/:id',show)
router.put('/quiz/:id',update)
router.delete('/quiz/:id',remove)

module.exports=router


