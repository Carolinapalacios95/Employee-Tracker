//Imports required packages and other js file
const inquirer = require("inquirer");
const cTable = require("console.table");
const query = require("./query.js");

// Initial function that holds the Inquirer questions menu
const init = async () => {
    while (true) {
        // launches the prompt interface (inquiry session)
        const choice = await inquirer.prompt({
            type: "list",
            name: "menu",
            message: "What would you like to do?",
            choices: [
                "View all Departments",
                "View all Roles",
                "View all Employees",
                "Add a new Department",
                "Add a new Role",
                "Add a new Employee",
                "Update Employee Role",
                "Exit"
            ],
        });

        // If else statement to select corresponding function based on user response
        if (choice.menu === "View all Departments") {
            //waits for the query function in server.js to carry out 
            const data = await query.getAllDepartments();
            // then logs the data to a table using cTable
            console.table(data);

        } else if (choice.menu === "View all Roles") {
            const data = await query.getAllRoles();
            console.table(data);

        } else if (choice.menu === "View all Employees") {
            const data = await query.getAllEmployees();
            console.table(data);

        } else if (choice.menu === "Add a new Department") {
            // runs a new prompt
            const newDept = await inquirer.prompt({
                type: "input",
                name: "name",
                message: "Please enter a department name.",
                validate: (input) => {
                //checks to make sure new dept name is within the VARCHAR(30) character limit
                    return input.length <= 30;
                },
            });
            //passes the user input as parameters into the addDepartment function in server.js
            await query.addDepartment(newDept.name);
            console.log("New department successfully added.");

        } else if (choice.menu === "Add a new Role") {
            // Creates a const that will hold the departments array for user to select from within prompt
            const depts_list = await query.getAllDepartments();
            const depts_choices = depts_list.map(({ id, name }) => ({
                name: name,
                value: id,
            }));
            // runs a new prompt
            const newRole = await inquirer.prompt([
                {
                    type: "input",
                    name: "title",
                    message: "Please enter a title for the new role.",
                    validate: (input) => {
                        return input.length <= 30;
                    },
                },
                {
                    type: "input",
                    name: "salary",
                    message: "Please enter a salary amount for the new role.",
                },
                {
                    type: "list",
                    name: "dept",
                    message: "Please select the department you would like to add this role to.",
                    choices: depts_choices,
                },
            ]);
            //passes the user input as parameters into the addRole function in server.js
            await query.addRole(newRole.title, newRole.salary, newRole.dept);
            console.log("New role successfully added.");

        } else if (choice.menu === "Add a new Employee") {
            // Creates a const that will hold the employees array for user to select from within prompt
            const emps_list = await query.getAllEmployees();
            const emps_choices = emps_list.map(({ id, first_name, last_name }) => ({
                name: first_name + " " + last_name,
                value: id,
            }));
            // Creates a const that will hold the roles array for user to select from within prompt
            const roles_list = await query.getAllRoles();
            const roles_choices = roles_list.map(({ id, title }) => ({
                name: title,
                value: id,
            }));
            //runs a new prompt
            const newEmp = await inquirer.prompt([
                {
                    type: "input",
                    name: "first_name",
                    message: "Please enter the employee's first name",
                    validate: (input) => {
                        return input.length <= 30;
                    },
                },
                {
                    type: "input",
                    name: "last_name",
                    message: "Please enter the employee's last name",
                    validate: (input) => {
                        return input.length <= 30;
                    },
                },
                {
                    type: "list",
                    name: "title",
                    message: "Please enter the employee's role title",
                    choices: roles_choices,
                },
                {
                    type: "list",
                    name: "manager",
                    message: "Enter the employee's manager",
                    choices: emps_choices,
                },
            ]);
            //passes the user input as parameters into the addEmployee function in server.js
            await query.addEmployee(
                newEmp.first_name,
                newEmp.last_name,
                newEmp.title,
                newEmp.manager
            );
            console.log("New employee successfully added.")

        } else if (choice.menu === "Update Employee Role") {
        
            const empls_list = await query.getAllEmployees();
            const empls_choices = empls_list.map(({ id, first_name, last_name }) => ({
                name: first_name + " " + last_name,
                value: id,
            }));
            const roles_list = await query.getAllRoles();
            const roles_choices = roles_list.map(({ id, title }) => ({
                name: title,
                value: id,
            }));
            const updateEmp = await inquirer.prompt([
                {
                    type: "list",
                    name: "employee",
                    message: "Please select an employee you wish to update.",
                    choices: empls_choices,
                },
                {
                    type: "list",
                    name: "title",
                    message: "Please select a new role for this employee.",
                    choices: roles_choices,
                },
            ]);
            await query.updateEmployee(updateEmp.title, updateEmp.employee);
            console.log("Employee role successfully updated.")
        }

    };
};

// A Function call to initialize app
init();