// function add(a:number , b:number):number{
//     return a + b
// }

// add(3,3)
// add(4,"10")

const multiply = (a: number , b: number):number => a * b

console.log(multiply(23,3))


function greet(name : string , city?:string):string{
    if(city) return `Hello ${name} from ${city}`
    return `Hello ${name}`
}

console.log(greet("john" , "New york"))
console.log(greet("john"))

function fees(course : string , discount : number = 0){
    const price = 20000
    return price - discount
}


console.log(fees("MERN"))
console.log(fees("MERN" , 5000))



function sayHello(name : string) :void{
    console.log("Hello " + name)
}


function throwError(message:string):never{
    throw new Error(message)
}

