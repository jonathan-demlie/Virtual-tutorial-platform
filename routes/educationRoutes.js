const express=require('express')
const router=express.Router();
const {create,update,show,remove} =require('../controllers/educationController')
const {protect} =require('../middleware/auth')

router.route('/education').post(protect,create)
router.route('/education/:id').get(show).put(protect,update).delete(protect,remove)


module.exports=router