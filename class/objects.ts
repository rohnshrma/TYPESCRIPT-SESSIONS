let student : {
  name: string;
  age: number;
  course: string,
} = {
  name: "Rohan",
  age: 23,
  course: "MERN",
}

// student.age = 34 // fine
// student.age = "Hello" // error 
// student.phone = 8765456788 // error : phone does not exist



type Student = {
  name : string;
  age : number;
  course : string
}

let s1 : Student = {name : "Rohan" , age : 23 , course : "MERN"}


interface  Course {
  name : String;
  fees : number;
  duration : string;
}


const mern : Course = {name : "MERN stack" , fees : 30000 , duration : "4 months" }


interface User{
  readonly id : number;
  name : string;
  email : string;
  readonly password? : string; 
}


const u1 : User = {id : 1, name : "vikram", email : "vikram@mail.com"}

u1.name = "John doe"
// u1.id = 100;


interface Learner {
  id : number ;
  name : string;
  marks : number;
}

const learners : Learner[] = [
  {id :  1 ,name : "john" , marks:34 },{id :2 ,name : "sakshi" , marks:35}, {id: 3 , name : "neelam" , marks : 92}
]

for (const item of learners ){
  console.log(`${item.name} scored ${item.marks}`)
}

const toppers = learners.filter(i => i.marks> 80)
console.log(toppers)