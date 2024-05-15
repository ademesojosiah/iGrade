const userService = require("../service/student.service")



const createStudent = async (req, res) => {
    const student = req.body;
  
    try {
      await userService.createStudent(student);
      res.status(201).send('Student data inserted successfully');
    } catch (err) {
      console.error('Error inserting student data', err);
      res.status(500).send('Internal server error');
    }
};
  
const updateWeekScore = async (req, res) => {
    const { matric_number, week_number, score } = req.body;
  
    try {
      await userService.updateWeekScore(matric_number, week_number, score);
      res.status(200).send('Week score updated successfully');
    } catch (err) {
      console.error('Error updating week score', err);
      res.status(500).send('Internal server error');
    }
};

const getStudentByMatricNumber = async (req, res) => {
    const { matric_number } = req.params;
  
    try {
      const student = await userService.getStudentByMatricNumber(matric_number);
      if (student) {
        res.status(200).json(student);
      } else {
        res.status(404).send('Student not found');
      }
    } catch (err) {
      console.error('Error retrieving student data', err);
      res.status(500).send('Internal server error');
    }
  };

module.exports ={
    createStudent,
    updateWeekScore,
    getStudentByMatricNumber
}