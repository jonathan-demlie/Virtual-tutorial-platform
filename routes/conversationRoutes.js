const express=require('express')
const router=express.Router();
const {create,fetchAll} =require('../controllers/conversationController')
const {protect} =require('../middleware/auth')

router.route('/conversation').post(create)
router.route('/conversation/:id').get(fetchAll)


module.exports=router