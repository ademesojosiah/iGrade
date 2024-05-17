require("dotenv").config();
const { Pool } = require("pg");

// Configure the pool using environment variables
const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.POSTGRES_PORT,
});

const getStudents = async () => {
  const client = await pool.connect();

  try {
    const result = await client.query("SELECT * FROM student_scores");
    return result.rows;
  } catch (err) {
    console.error('Error fetching students', err.stack);
    throw err;
  } finally {
    client.release();
  }
};


const getStudentByMatricNumber = async (matric_number) => {
    const client = await pool.connect();
  
    try {
      // Query to get the student details
      const query = `
        SELECT *
        FROM student_scores
        WHERE matric_number = $1;
      `;
      const values = [matric_number.toUpperCase()];


      const result = await client.query(query, values);
  
      if (result.rows.length === 0) {
        return null; // No student found with the given matric number
      }
      
      return result.rows[0]; // Return the student details
    } catch (err) {
      console.error('Error executing query', err.stack);
      throw err;
    } finally {
      client.release();
    }
  };

  const titleCase = (str) => {
    if (!str) return str;
    return str.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };
  
  const createStudent = async (student) => {
    let { matric_number, first_name, middle_name, last_name, department } = student;
  
    // Convert to desired formats
    matric_number = matric_number.toUpperCase();
    first_name = titleCase(first_name);
    middle_name = titleCase(middle_name);
    last_name = titleCase(last_name);
  
    const client = await pool.connect();
  
    try {
      // Ensure the table exists
      const createTableQuery = `
        CREATE TABLE IF NOT EXISTS student_scores (
          id SERIAL PRIMARY KEY,
          matric_number VARCHAR(20) UNIQUE NOT NULL,
          first_name VARCHAR(50) NOT NULL,
          middle_name VARCHAR(50),
          last_name VARCHAR(50) NOT NULL,
          department VARCHAR(50) NOT NULL,
          week1 INTEGER,
          week2 INTEGER,
          week3 INTEGER
        );
      `;
      await client.query(createTableQuery);
  
      // Insert the student data
      const insertQuery = `
        INSERT INTO student_scores (matric_number, first_name, middle_name, last_name, department)
        VALUES ($1, $2, $3, $4, $5)
        ON CONFLICT (matric_number) 
        DO NOTHING;
      `;
      const values = [matric_number, first_name, middle_name, last_name, department];
      await client.query(insertQuery, values);
    } catch (err) {
      if (err.code === '23505') {
        console.error('Error: Matriculation number already registered.');
        // You can display a message to the user indicating the conflict
      } else {
        console.error('Error executing query', err.stack);
      }
    } finally {
      client.release();
    }
}

const updateWeekScore = async (matric_number, week_number, score) => {
    const client = await pool.connect();
  
    try {
      // Update the week score
      const updateQuery = `
        UPDATE student_scores
        SET week${week_number} = $1
        WHERE matric_number = $2;
      `;
      const values = [score, matric_number.toUpperCase()];
      const result = await client.query(updateQuery, values);
  
      if (result.rowCount === 0) {
        console.log('No student found with the given matric number.');
      } else {
        console.log('Week score updated successfully.');
      }
    } catch (err) {
      console.error('Error executing query', err.stack);
    } finally {
      client.release();
    }
  };



module.exports = {createStudent,getStudents,updateWeekScore,getStudentByMatricNumber,getStudents};