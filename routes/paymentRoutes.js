const express = require("express");
const router=express.Router()
const {pay,show,fetchAll,fetchTutor,update}=require('../controllers/paymentController')

router.route('/payment').post(pay)
router.route('/payments').get(fetchAll)
router.route('/payment/:id').get(fetchTutor)
router.route('/payment/:id').put(update)

module.exports=router


