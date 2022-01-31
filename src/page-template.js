function bodyHTML(title, card) {
  return `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />       
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/css/bootstrap.min.css" rel="stylesheet" 
      integrity="sha384-+0n0xVW2eSR5OomGNYDnhzAbDsOXxcvSN1TPprVMTNDbiYZCxYbOOl7+AMvyTG2x" crossorigin="anonymous">
      <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css" integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf" crossorigin="anonymous"/>
      <link rel="stylesheet" href="./dist/style.css">
      <title> Team Profile Generator | ${title} </title>
    </head>
    <body class="bg-light">  
      <header>
        <h1 class= "bg-danger bg-gradient text-center text-light p-3">${title}</h1>
      </header>     
      ${card}
      <footer class="bg-danger bg-gradient text-center text-light p-3 fixed-bottom">
      <div>&copy;tooqk4u 2022 <bdo dir="rtl">&copy;</bdo></div>
    </footer>
  </body>`;
}
module.exports = bodyHTML