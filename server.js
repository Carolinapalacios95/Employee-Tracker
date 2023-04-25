// Imports and require mysql2
const mysql = require('mysql2');

// Connects to database
const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // MySQL password
      password: '000',
      database: 'employee_db'
    },
    console.log(`Connected to the classlist_db database.`)
  );

// Gets department data from database
const getAllDepartments = async () => {
    const data = await db.promise().execute("SELECT * FROM `departments`");
    return data[0];
}

