const express=require('express')
const router =express.Router()
const {create,fetchAll,show,remove}=require('../controllers/questionController')

router.post('/question',create)
router.get('/questions/:id',fetchAll)
router.get('/question/:id',show)
router.delete('/question/:id',remove)


module.exports=router