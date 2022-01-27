const inquirer = require("inquirer");
const fs = require("fs");

const Engineer = require("./lib/Engineer");
const Manager = require("./lib/Manager");
const Intern = require("./lib/Intern");


// team array
const team = [];

console.log(`
==========================================================
Answer these questions to generate a new Team-Profile-Page
==========================================================
`);

// questions
const employeeQuestions = () => {
  return inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "What is the employee's name.",
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
        roleInfo = "school name";
      }
      inquirer
        .prompt([
          {
            name: "roleInfo",
            message: `Enter employee's ${roleInfo}`,
          },
          {
            type: "list",
            name: "addMembers",
            message: "Would you like to add more employee's?",
            choices: ["yes", "no"],
          },
        ])   
        
    });
};
 //create HTML
 function createHTML() {
   const html =
   `<!DOCTYPE html>
   <html lang="en">
     <head>
       <meta charset="UTF-8" />
       <meta http-equiv="X-UA-Compatible" content="IE=edge" />
       <meta name="viewport" content="width=device-width, 
   initial-scale=1.0" />
       <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/
   dist/css/bootstrap.min.css" rel="stylesheet" 
   integrity="sha384-
   +0n0xVW2eSR5OomGNYDnhzAbDsOXxcvSN1TPprVMTNDbiYZCxYbOOl7
   +AMvyTG2x" crossorigin="anonymous">
       <link rel="stylesheet" href="https://use.fontawesome.com/
   releases/v5.8.1/css/all.css" integrity="sha384-50oBUHEmvpQ
   +1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf" 
   crossorigin="anonymous"/>
       <link rel="stylesheet" href="./dist/style.css">
     
       <title>Team Profile</title>
     </head>
     <body class="bg-light">  
       <header>
         <h1 class="bg-danger bg-gradient text-center text-light 
   p-3">Team Profile</h1>
     </header>   
     <main>`;

     fs.writeFile("./dist/output-HTML", html, function(err) {
      if (err) {
          console.log(err);
         } 
     }
    )
}; 
employeeQuestions();
createHTML();
