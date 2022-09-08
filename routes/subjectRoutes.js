const express =require("express")
const router =express.Router()
const {create,fetchAll,update,remove,fetchSome} =require('../controllers/subjectController')
const uploadImage=require('../middleware/image');


router.route('/subject').get(fetchAll).post(uploadImage,create)
router.route('/subject/:id').put(update).delete(remove)
router.route('/subjects').get(fetchSome)
module.exports=router