const express=require('express')
const router=express.Router()
const uploadFile=require('../middleware/file')
const {create,fetchAll,remove}=require('../controllers/verifyController')

router.route('/verify').post(uploadFile,create).get(fetchAll)
router.route('/verify/:id').delete(remove)
module.exports=router