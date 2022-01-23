const Intern = require('../lib/Intern.js');

test("All intern properties", () => {
  const intern = new Intern ("John", 994, "rat@rat", "UCONN");

expect(intern.school).toBe("UCONN");
})
