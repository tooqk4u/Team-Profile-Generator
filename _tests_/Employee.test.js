const Employee = require("../lib/Employee.js");

test("test all employee properties", () => {
  const employee = new Employee("Dan", 123, "tttoo@nnfmd");

  expect(typeof(employee)).toBe("object");
  expect(employee.name).toBe("Dan");
  expect(employee.id).toBe(123);
  expect(employee.email).toBe("tttoo@nnfmd");
});

test("test all employee methods", () => {
  const employee = new Employee("Paul", 998, "we@yu");

  expect(employee.getName()).toBe("Paul");
  expect(employee.getId()).toBe(998);
  expect(employee.getEmail()).toBe("we@yu");
  expect(employee.getRole()).toBe("Employee");
});
