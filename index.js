const inquirer = require("inquirer");
const fs = require("fs");

const Engineer = require("./lib/Engineer");
const Manager = require("./lib/Manager");
const Intern = require("./lib/Intern");
const generateTeam = require("./src/page-template");

// team array
const team = [];

console.log(`
==========================================================
Answer these questions to generate a new Team-Profile-Page
==========================================================
`);

// questions
const questions = () => {
  return inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "What is the team member's name.",
      validate: (nameInput) => {
        if (nameInput) {
          return true;
        } else {
          console.log("Please enter a name");
          return false;
        }
      },
    },
    {
      type: "input",
      name: "id",
      message: "What is their employee id? (enter a number)",
      validate: (idInput) => {
        const temp = parseInt(idInput);
        if (temp) {
          return true;
        } else {
          console.log(`Please enter an id number.`);
          return false;
        }
      },
    },
    {
      type: "input",
      name: "email",
      message: "Please enter their email address.",
      validate: (emailInput) => {
        if (emailInput) {
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
      message: "Please select team member's role.",
      choices: ["Engineer", "Intern", "Manager"],
    },
  ])
  .then(function({name, role, id, email}) {
    let roleInfo = "";
    if (role === "Engineer") {
        roleInfo = "GitHub username";
    } else if (role === "Intern") {
        roleInfo = "school name";
    } else {
        roleInfo = "office number";
    }
    inquirer.prompt([{
        name: "roleInfo",
        message: `Enter team member's ${roleInfo}`,
    },
    {
        type: "list",
        name: "addMembers",
        message: "Would you like to add more team members?",
        choices: [
            "yes",
            "no"
        ],
    }])
  })
};


questions();
