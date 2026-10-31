"use strict";
let student = {
    name: "Rohan",
    age: 23,
    course: "MERN",
};
let s1 = { name: "Rohan", age: 23, course: "MERN" };
const mern = { name: "MERN stack", fees: 30000, duration: "4 months" };
const u1 = { id: 1, name: "vikram", email: "vikram@mail.com" };
u1.name = "John doe";
const learners = [
    { id: 1, name: "john", marks: 34 }, { id: 2, name: "sakshi", marks: 35 }, { id: 3, name: "neelam", marks: 92 }
];
for (const item of learners) {
    console.log(`${item.name} scored ${item.marks}`);
}
const toppers = learners.filter(i => i.marks > 80);
console.log(toppers);
