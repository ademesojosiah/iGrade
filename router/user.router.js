const router = require("express").Router();
const userController = require("../controller/user.controller")

router.post('/add-student', userController.createStudent)
router.put('/update-week-score',userController.updateWeekScore)
router.route('/get-student').get(userController.getStudentByMatricNumber).delete(userController.deleteStudentByMatricNumber)
router.get('/students',userController.getStudents)
router.get('/download-csv', userController.downloadCsv)

module.exports = router;