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
            console.log("Please enter a name");
            return false;
          }
        },
      },
      {
        type: "number",
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
      }
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
          addEmployeeHTML(newEmployee).then(function () {
            if (addEmployees === "yes") {
              employeeQuestions();
            } else {
              finishHTML();
            }
          });
        });
      });
};

// add create HTML function
function createHTML() {
  const html = `<!DOCTYPE html>
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

  fs.writeFile("./dist/output-HTML", html, function (err) {
    if (err) {
      console.log(err);
    }
  });
}

// add function that adds each employee to HTML

function addEmployeeHTML(employee) {
  return new Promise(function (resolve, reject) {
  let name = employee.getName();
  let id = employee.getId();
  let email = employee.getEmail();
  let role = employee.getRole();
  let data = "";
  if (role === "Manager") {
    let officeNumber = employee.getOfficeNumber();
    data = `     
    <div class="container d-flex flex-wrap justify-content-around">
      <div class="card rounded-3 bg-secondary m-2 "style="width: 300px" >
      <div class="card-title bg-primary text-light p-2">
         <h3>${name}</h3>
         <h5><i class="fas fa-coffee"></i> ${role}</h5>
      </div>
      <div class="card-body ">
        <div class="list-group list-group-flush">
          <div class="list-group-item">ID: ${id}</div>
          <div class="list-group-item">Email: <ahref="mailto:${email}"> ${email}</a></div>
          <div class="list-group-item">Office Number: ${officeNumber}</div>
        </div>
       </div>
      </div>`;
  } else if (role === "Engineer") {
    let github = employee.getGithub();
    data = `
    <div class="card rounded-3 bg-secondary m-2 " style="width: 300px" >
      <div class="card-title bg-primary text-light p-2">
        <h3>${name}</h3>
        <h5><i class="fas fa-glasses"></i> ${role}</h5></div>
      <div class="card-body ">
        <div class="list-group list-group-flush">
          <div class="list-group-item">ID: ${id}</div>
          <div class="list-group-item">Email:<a href="mailto:${email}"> ${email}</a></div>
          <div class="list-group-item">GitHub: <a href="https://github.com/${github}"target="_blank"> ${github}</a></div>
        </div>
     </div>
    </div>`;
  } else if (role === "Intern") {
    let school = employee.getSchool();
    data = `
  <div class="card rounded-3 bg-secondary m-2" style="width: 300px" >
   <div class="card-title bg-primary text-light p-2">
     <h3>${name}</h3>
     <h5><i class="fas fa-school"></i> ${role}</h5>
   </div>
  <div class="card-body ">
    <div class="list-group list-group-flush">
      <div class="list-group-item">ID: ${id}</div>
      <div class="list-group-item">Email: <ahref="mailto:${email}"> ${email}</a></div>
      <div class="list-group-item">School:<ahref="https://google.com/search?q=${school}"target="_blank">${school}</a></div>
    </div>
  </div>`;
  }

  fs.appendFile("./dist/output-HTML", data, function (err) {
    if (err) {
      return reject(err);
    }
    return resolve();
  });
 });
}

function finishHTML() {
  const html = ` </div>
  </div>
  
  </body>
  </html>`;

  fs.appendFile("./dist/output-HTML", 
html, function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log(
        "Team Profile complete! Check outoutput-HTML in dist directory to see the output!"
      );
    }
  });
}

















