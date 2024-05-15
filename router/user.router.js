const router = require("express").Router();
const userController = require("../controller/user.controller")

router.post('/add-student', userController.createStudent)
router.put('/update-week-score',userController.updateWeekScore)
router.get('/get-student/:matric_number',userController.getStudentByMatricNumber)

module.exports = router;