const router = require("express").Router();
const userController = require("../controller/user.controller")

router.post('/add-student', userController.createStudent)
router.put('/update-week-score',userController.updateWeekScore)
router.get('/get-student',userController.getStudentByMatricNumber)
router.get('/students',userController.getStudents)
router.get('/download-csv', userController.downloadCsv)

module.exports = router;