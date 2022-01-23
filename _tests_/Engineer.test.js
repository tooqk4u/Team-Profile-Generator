const Engineer = require('../lib/Engineer.js');

test("all engineer properties", () => {
  const engineer = new Engineer ("Lisa", 234, "testa@test", "Lisa2112");

  expect(engineer.github).toBe("Lisa2112");
})

test("test all engineer methods", () => {
  const engineer = new Engineer 
  ("Lisa", 234, "test@test","Lisa2112");

  expect(engineer.getGithub()).toBe("Lisa2112");
  expect(engineer.getRole()).toBe("Engineer")
})




