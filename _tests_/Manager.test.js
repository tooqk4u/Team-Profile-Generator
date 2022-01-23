const Manager = require('../lib/Manager.js');

test("test all manager properties", () => {
  const manager = new Manager ("Bess", 444, "yes@yes", 121);

  expect(manager.officeNumber).toBe(121);
})



