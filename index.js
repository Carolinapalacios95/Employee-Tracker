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

        

        }

    };
};

// A Function call to initialize app
init();