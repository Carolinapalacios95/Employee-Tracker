//Imports required packages and other js file
const inquirer = require("inquirer");
const cTable = require("console.table");
const query = require("./query.js");

// Inquirer questions menu
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

    };
};

// A Function call to initialize app
init();