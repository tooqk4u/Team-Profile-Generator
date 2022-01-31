function managerCard(team) {
  const {name, id, getRole, email, officeNumber} = team
  return `<div class="container d-flex flex-wrap justify-content-around">
  <div class="card rounded-3 bg-secondary m-2 "style="width: 300px" >
  <div class="card-title bg-primary text-light p-2">
     <h3>${name}</h3>
     <h5><i class="fas fa-coffee"></i> ${getRole()}</h5>
  </div>
  <div class="card-body ">
    <div class="list-group list-group-flush">
      <div class="list-group-item">ID: ${id}</div>
      <div class="list-group-item">Email: <a href="mailto:${email}">  ${email}</a></div>
      <div class="list-group-item">Office Number: ${officeNumber}</div>
    </div>
   </div>
  </div>`;
}
 module.exports = managerCard