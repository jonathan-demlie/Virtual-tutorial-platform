const express =require("express")
const router =express.Router()
const {create,fetchAll,show,update,remove} =require('../controllers/reportController')

router.route('/report').post(create)
router.route('/report/:id').put(update).delete(remove)
router.route('/report').get(fetchAll)

module.exports=router