const inquirer = require("inquirer");
const fs = require("fs");
const bodyHTML = require("./src/page-template");
const engineerCard = require("./src/engineerCard");
const managerCard = require("./src/managerCard");
const internCard = require("./src/internCard");
const Engineer = require("./lib/Engineer");
const Manager = require("./lib/Manager");
const Intern = require("./lib/Intern");

// Team array
let team = [];

async function initialize() {
  await newFunction();
}

console.log(`
==========================================================
                                                      
  Answer these questions to generate a Team-Profile-Page 
                                                       
==========================================================
`);

// Team title
const nameTeam = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "teamName",
        message:
          "Welcome to Team Profile Generator! Please enter your team name:",
      },
    ])
    .then(function (data) {
      let teamName = data.teamName;
      team.push(teamName);
      employeeQuestions();
      
    });
};

// Employee questions
const employeeQuestions = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "What is the employee's name.",
        validate: (nameInput) => {
          if (nameInput) {
            return true;
          } else {
            return "Please enter a name";
          }
        },
      },
      {
        type: "number",
        name: "id",
        message: "What is their employee id? (enter a number)",
        validate: (idInput) => {
          const valid = /^[0-9]+$/.test(idInput);
          if (valid) {
            return true;
          } else {
            console.log("Pleae enter a number.");
            return;
          }
        },
      },
      {
        type: "input",
        name: "email",
        message: "Please enter their email address.",
        validate: (email) => {
          const valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
            email
          );
          if (valid) {
            return true;
          } else {
            console.log("Please enter an email.");
            return false;
          }
        },
      },
      {
        type: "list",
        name: "role",
        message: "Please select employee's role.",
        choices: ["Manager", "Engineer", "Intern"],
      },
    ])
    .then(function ({ name, role, id, email }) {
      let roleInfo = "";
      if (role === "Manager") {
        roleInfo = "office number";
      } else if (role === "Engineer") {
        roleInfo = "GitHub username";
      } else {
        roleInfo = "school";
      }
      inquirer
        .prompt([
          {
            name: "roleInfo",
            message: `Enter employee's ${roleInfo}`,
          },
          {
            type: "list",
            name: "addEmployees",
            message: "Would you like to add more employee's?",
            choices: ["yes", "no"],
          },
        ])
        .then(function ({ roleInfo, addEmployees }) {
          let newEmployee;
          if (role === "Engineer") {
            newEmployee = new Engineer(name, id, email, roleInfo);
          } else if (role === "Intern") {
            newEmployee = new Intern(name, id, email, roleInfo);
          } else {
            newEmployee = new Manager(name, id, email, roleInfo);
          }
          team.push(newEmployee);
          //addEmployeeHTML(newEmployee).then(function () {
          if (addEmployees === "yes") {
            employeeQuestions();
          } else {
            finishHTML();
          }
          //});
        });
    });
};

async function newFunction() {
  await nameTeam();
}

// Function to complete HTML by appending file
function finishHTML() { 
  let cards = "";
  for (let i = 1; i < team.length; i++) {
    if (team[i].getRole() === "Manager") {
      cards = cards + managerCard(team[i]);
    } else if(team[i].getRole() === "Engineer") {
      cards = cards + engineerCard(team[i])
    }else{
      cards = cards + internCard(team[i])
    
    }
  }
  fs.writeFileSync("./dist/index.html", bodyHTML(team[0], cards), function(err) {
    if (err) {
      console.log (err)
    } 
  })
  console.log(`
===============================================================================
 Team Profile complete! Check index.html in dist directory to see the output!
===============================================================================
`);
};






//call initalize function
initialize();
