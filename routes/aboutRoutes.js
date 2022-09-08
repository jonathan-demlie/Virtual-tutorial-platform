const express=require('express')
const router=express.Router();
const {create,update,show,remove} =require('../controllers/aboutController')
const {protect} =require('../middleware/auth')

router.route('/about').post(protect,create)
router.route('/about/:id').get(show).put(protect,update).delete(protect,remove)


module.exports=router