const express =require("express")
const router =express.Router()
const {create,fetchAll,show,update,remove,checkReview,studentReview} =require('../controllers/reviewController')

router.route('/review').post(create)
router.route('/review/:id').get(fetchAll).put(update).delete(remove)
router.route('/my-review/:id').get(checkReview)
router.route('/student/review/:studentId/:tutorId').get(studentReview)

module.exports=router