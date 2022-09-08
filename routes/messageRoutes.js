const express=require('express')
const router=express.Router();
const {create,fetchAll} =require('../controllers/messageController')
const {protect} =require('../middleware/auth')

router.route('/message').post(create)
router.route('/message/:id').get(fetchAll)


module.exports=router