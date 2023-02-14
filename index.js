const inquirer = require('inquirer');
const fs = require('fs');

const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');

const employees = [];

function init() {
    inquirer.prompt([{
        message: "What is the name of your team?",
        name: "teamName"
    }])
        .then(function (data) {
            const teamName = data.teamName;
            employees.push(teamName);
            managerQuestions();
        })
}

function managerQuestions() {
    return inquirer.prompt([{
        type: 'input',
        name: 'name',
        message: 'What is the name of the manager?'
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
    ])
        .then(function (data) {
            const name = data.name
            const id = 1
            const email = data.email
            const officeNumber = data.officeNumber
            const manager = new Manager(name, id, email, officeNumber);

            employees.push(manager);

            addEmployeeQuestions();
        })
}


function addEmployeeQuestions() {
    inquirer.prompt([{
        type: 'list',
        message: 'Would you like to add another employee?',
        choices: ['Engineer', 'Intern', 'No'],
        name: 'addEmployee'
    }])
        .then(function (data) {
            switch (data.addEmployee) {
                case 'Engineer':
                    engineerQuestions();
                    break;
                case 'Intern':
                    internQuestions();
                    break;
                case 'No':
                    completeTeam();
                    break;
            }
        })
}


function engineerQuestions() {
    inquirer.prompt([{
        type: 'input',
        name: 'name',
        message: 'What is the name of the engineer?'
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
    ])
        .then(function (data) {
            const name = data.name
            const id = employees.length
            const email = data.email
            const github = data.github
            const engineer = new Engineer(name, id, email, github);

            employees.push(engineer);
            addEmployeeQuestions();
        })
};


function internQuestions() {
    inquirer.prompt([{
        type: 'input',
        name: 'name',
        message: 'What is the name of the intern?'
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
    ])
        .then(function (data) {
            const name = data.name
            const id = employees.length
            const email = data.email
            const school = data.school
            const intern = new Intern(name, id, email, school);

            employees.push(intern);
            addEmployeeQuestions();
        })
};

function completeTeam() {
    const htmlArray = [];
    const htmlStart = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${employees[0]}</title>
        <link rel="stylesheet" href="/src/style.css">
        </head>
        
        <body>
        
        <header>
            <h1>${employees[0]}</h1>
        </header>
        <div class="container">`
    htmlArray.push(htmlStart);

    for (let i = 1; i < employees.length; i++) {
        let employee = `
        <div class="card">
            <div class="card-top">
                <h2>${employees[i].name}</h2>
                <h3>${employees[i].role}</h3>
            </div>
            <div class="card-bottom">
                <p>ID: ${employees[i].id}</p>
            <p>Email: <a href="mailto:${employees[i].email}">${employees[i].email}</a></p>
        `
        if (employees[i].officeNumber) {
            employee += `<p>Office Number: ${employees[i].officeNumber}</p>`
        }
        if (employees[i].github) {
            employee += `<p>GitHub: <a href="https://github.com/${employees[i].github}">${employees[i].github}</a></p>`
        }
        if (employees[i].school) {
            employee += `<p>School: ${employees[i].school}</p>`
        }
        employee += `
            </div>
        </div>`
        htmlArray.push(employee);
    }

    const htmlEnd = `
    </div>
    </body>
    </html>`
    
    htmlArray.push(htmlEnd);

    fs.writeFile('./dist/index.html', htmlArray.join(''), function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log('Success!');
        }
    })
}


init();


