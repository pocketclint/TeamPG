const Intern = require("../lib/Intern");

test("Can set school via constructor", () => {
    const testValue = "Rice";
    const e = new Intern("Clint", 1, "fake@email.com", testValue);
    expect(e.school).toBe(testValue);
});

test("getRole() should return \"Intern\"", () => {
    const testValue = "Intern";
    const e = new Intern("Clint", 1, "fake@email.com", "Rice");
    expect(e.getRole()).toBe(testValue);
});

test("Can get school via getSchool()", () => {
    const testValue = "Rice";
    const e = new Intern("Clint", 1, "fake@email.com", testValue);
    expect(e.getSchool()).toBe(testValue);
});