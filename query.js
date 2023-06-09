// Imports and require mysql2
const mysql = require('mysql2');

// Connects to the database
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

// Gets department data from the database
const getAllDepartments = async () => {
    const data = await db.promise().execute("SELECT * FROM `departments`");
    return data[0];
};

// Gets roles and department data from the database
const getAllRoles = async () => {
    const data = await db.promise().execute(
        "SELECT `roles`.`id`, `roles`.`title`, `departments`.`name` AS `departments`, `roles`.`salary`\
         FROM `roles`\
         JOIN `departments`\
         ON `roles`.`department_id` = `departments`.`id`\
         ORDER BY `roles`.`id` ASC");
    return data[0];
};

// Gets employees, roles and department data from the database
const getAllEmployees = async () => {
    const data = await db.promise().execute(
        "SELECT `e`.`id`, `e`.`first_name`, `e`.`last_name`, `r`.`title`, `d`.`name` AS `departments`, `r`.`salary`, CONCAT(`m`.`first_name`, ' ', `m`.`last_name`) AS `manager`\
         FROM `employees` e\
         JOIN `roles` r\
         ON `r`.`id` = `e`.`role_id`\
         JOIN `departments` d\
         ON  `r`.`department_id` = `d`.`id`\
         LEFT JOIN `employees` m\
         ON `e`.`manager_id` = `m`.`id`\
         ORDER BY `e`.`id` ASC");
    return data[0];
};

// Adds a new department to the database
const addDepartment = async (name) => {
    await db.promise().execute(
        "INSERT INTO `departments` (name)\
        VALUES (?)", [name]);
};

// Adds a new role to the database
const addRole = async (title, salary, dept) => {
    await db.promise().execute(
        "INSERT INTO `roles` (title, salary, department_id)\
        VALUES (?, ?, ?)", [title, salary, dept]);
};

// Adds employee to the database
const addEmployee = async (first, last, title, manager) => {
    console.log({first, last, title, manager})
    await db.promise().execute(
        "INSERT INTO `employees` (first_name, last_name, role_id, manager_id)\
        VALUES (?, ?, ?, ?)", [first, last, title, manager]);
};

// Updates an employee's role in the database
const updateEmployee = async (title, id) => {
    await db.promise().execute(
        "UPDATE `employees`\
        SET `role_id` = ?\
        WHERE employees.id = ?", [title, id]);
};

module.exports = {
    getAllDepartments,
    getAllRoles,
    getAllEmployees,
    addDepartment,
    addRole,
    addEmployee,
    updateEmployee,
};