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
};

// Gets roles and department data from database
const getAllRoles = async () => {
    const data = await db.promise().execute(
        "SELECT `roles`.`id`, `roles`.`title`, `departments`.`name` AS `departments`, `roles`.`salary`\
         FROM `roles`\
         JOIN `departments`\
         ON `roles`.`department_id` = `departments`.`id`\
         ORDER BY `roles`.`id` ASC");
    return data[0];
};

// Get employee, role and department data from database
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
