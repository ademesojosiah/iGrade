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
    console.error("Error fetching students", err.stack);
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
    console.error("Error executing query", err.stack);
    throw err;
  } finally {
    client.release();
  }
};

const titleCase = (str) => {
  if (!str) return str;
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const createStudent = async (student) => {
  let { matric_number, first_name, middle_name, last_name, department, part } =
    student;

  // Convert to desired formats
  matric_number = matric_number.toUpperCase();
  first_name = titleCase(first_name);
  middle_name = titleCase(middle_name);
  last_name = titleCase(last_name);

  const name = `${first_name} ${middle_name} ${last_name}`;

  const client = await pool.connect();

  try {
    // Ensure the table exists
    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS student_scores (
          id SERIAL PRIMARY KEY,
          session varchar(20) DEFAULT '2022/2023',
          semester varchar(20) DEFAULT 'Rain',
          course varchar(20) DEFAULT 'CSC302',
          course_unit INTEGER DEFAULT 3,
          matric_number VARCHAR(20) UNIQUE NOT NULL,
          name VARCHAR(50) NOT NULL,
          part INTEGER,
          department VARCHAR(50) DEFAULT 'Computer Science and Engineering' NOT NULL,
          week1 INTEGER,
          week2 INTEGER,
          week3 INTEGER,
          week4 INTEGER
        );
      `;
    await client.query(createTableQuery);

    // Query the current maximum id
    const maxIdQuery =
      "SELECT COALESCE(MAX(id), 0) + 1 AS next_id FROM student_scores";
    const result = await client.query(maxIdQuery);
    const nextId = result.rows[0].next_id;

    // Insert the student data
    const insertQuery = `
        INSERT INTO student_scores (id, matric_number, name, department, part)
        VALUES ($1, $2, $3, $4, $5)
        ON CONFLICT (matric_number) 
        DO NOTHING;
      `;
    const values = [nextId, matric_number, name, department, part];
    return await client.query(insertQuery, values);
  } catch (err) {
    console.error("Error executing query", err.stack);
  } finally {
    client.release();
  }
};

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
      console.log("No student found with the given matric number.");
    } else {
      console.log("Week score updated successfully.");
    }
  } catch (err) {
    console.error("Error executing query", err.stack);
  } finally {
    client.release();
  }
};

const deleteStudentByMatricNumber = async (matric_number) => {
  const client = await pool.connect();
  try {
    const result = await client.query(
      "DELETE FROM student_scores WHERE matric_number = $1",
      [matric_number.toUpperCase()]
    );
    return result.rowCount > 0;
  } catch (err) {
    console.error("Error deleting student", err.stack);
    throw err;
  } finally {
    client.release();
  }
};

module.exports = {
  createStudent,
  getStudents,
  updateWeekScore,
  getStudentByMatricNumber,
  getStudents,
  deleteStudentByMatricNumber,
};
