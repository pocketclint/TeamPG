const inquirer = require('inquirer');
const fs = require('fs');

const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');

const employees = [];

function managerQuestions() {
    return inquirer.prompt ([{
        type: 'input',
        name: 'name',
        message: 'What is the name of the manager?'
    },
    {
        type: 'input',
        name: 'id',
        message: 'What is the id of the manager?'
    },
    {
        type: 'input',
        name: 'email',
        message: 'What is the email of the manager?'
    },
    {
        type: 'input',
        name: 'officeNumber',
        message: 'What is the office number of the manager?'
    },
    {
        type: 'list',
        name: 'addEmployee',
        message: 'Would you like to add another employee?',
        choices: ['Engineer', 'Intern', 'No']
    }
    ])
    .then(managerDetails => {
        const {name, id, email, officeNumber, addEmployee} = managerDetails;
        const manager = new Manager(name, id, email, officeNumber);

        employees.push(manager);
        console.log(manager);
        addEmployeeQuestions(addEmployee);
    })
};
            
function addEmployeeQuestions(addEmployee) {
    if (addEmployee === 'Engineer') {
        return inquirer.prompt ([{
            type: 'input',
            name: 'name',
            message: 'What is the name of the engineer?'
        },
        {
            type: 'input',
            name: 'id',
            message: 'What is the id of the engineer?'
        },
        {
            type: 'input',
            name: 'email',
            message: 'What is the email of the engineer?'
        },
        {
            type: 'input',
            name: 'github',
            message: 'What is the github of the engineer?'
        },
        {
            type: 'list',
            name: 'addEmployee',
            message: 'Would you like to add another employee?',
            choices: ['Engineer', 'Intern', 'No']
        }
        ])
        .then(engineerDetails => {
            const {name, id, email, github, addEmployee} = engineerDetails;
            const engineer = new Engineer(name, id, email, github);

            employees.push(engineer);
            console.log(engineer);
            addEmployeeQuestions(addEmployee);
        })
    } else if (addEmployee === 'Intern') {
        return inquirer.prompt ([{
            type: 'input',
            name: 'name',
            message: 'What is the name of the intern?'
        },
        {
            type: 'input',
            name: 'id',
            message: 'What is the id of the intern?'
        },
        {
            type: 'input',
            name: 'email',
            message: 'What is the email of the intern?'
        },
        {
            type: 'input',
            name: 'school',
            message: 'What is the school of the intern?'
        },
        {
            type: 'list',
            name: 'addEmployee',
            message: 'Would you like to add another employee?',
            choices: ['Engineer', 'Intern', 'No']
        }
        ])
        .then(internDetails => {
            const {name, id, email, school, addEmployee} = internDetails;
            const intern = new Intern(name, id, email, school);

            employees.push(intern);
            console.log(intern);
            addEmployeeQuestions(addEmployee);
        })
    } else {
        console.log(employees);
    }
};

managerQuestions();