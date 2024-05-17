const userService = require("../service/student.service")
const csv = require("../middleware/csv")



const createStudent = async (req, res) => {
    const student = req.body;
  
    try {
      const result = await userService.createStudent(student);
      if (result.rowCount === 0) {
       return res.status(403).send('Matriculation number already registered.');
      }
      res.status(201).send('Student data inserted successfully');
    } catch (err) {
      console.error('Error inserting student data', err);
      res.status(500).send('Internal server error');
    }
};

const getStudents =  async (req, res) => {
  try {
    const students = await userService.getStudents();
    res.status(200).json(students);
  } catch (err) {
    console.error('Error fetching students', err);
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
    const matric_number = req.query.matric;
  
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

  const downloadCsv = async (req, res)=>{
    const students = await userService.getStudents();
  
    try {
      const csvString = csv.generateCSVString(students);
      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', 'attachment; filename=students.csv');
      res.status(200).send(csvString);
  } catch (error) {
      console.error('Error generating CSV:', error);
      res.status(500).send('Internal Server Error');
  }
  }


  const deleteStudentByMatricNumber = async (req, res) => {
    const matric_number = req.query.matric;
    try {
        const success = await userService.deleteStudentByMatricNumber(matric_number);
        if (success) {
            res.status(200).send('Student deleted successfully');
        } else {
            res.status(404).send('Student not found');
        }
    } catch (err) {
        console.error('Error deleting student', err);
        res.status(500).send('Internal server error');
    }
  }

module.exports ={
    createStudent,
    updateWeekScore,
    getStudentByMatricNumber,
    getStudents,
    downloadCsv,
    deleteStudentByMatricNumber
}