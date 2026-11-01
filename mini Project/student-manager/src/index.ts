import {StudentManager} from "./manager.ts"
import {printList} from "./utils.js"


const manager = new StudentManager()



manager.add("Aman", "MERN" , 82 , "aman@hello.com")
manager.add("Neelesh", "Data Analytics" , 84 )
manager.add("Vikas", "Python" , 44 )


printList("All Students" , manager.list())


const topper = manager.topper()

if(topper){
    console.log(`\nTopper : ${topper.name} (${topper.marks} marks)`)
}


console.log(`Average Marks : ${manager.average().toFixed(2)}`)

printList("Mern Students" , manager.byCourse("MERN"))

const found = manager.findByName("Vikas")

console.log(found ?    `Found : ${found.name}` : `Student not found`)



manager.add("Rahul", "java" , 80)