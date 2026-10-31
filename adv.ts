function prints(id: string | number){
    if(typeof id === "string"){
        console.log(id.toUpperCase())
    }else{
        console.log(id.toFixed(2))
    }
}

prints("abc123")
prints(45.3434343);


interface Bird{
    fly() : void
}
interface Fish{
    swim() : void
}


function move(animal : Bird | Fish)
{
    if ("fly" in animal){
        animal.fly
    }else{
        animal.swim()
    }
}


function firstNumber(arr : number[]): number{
    return arr[0]
}

function first<T> (arr : T[]) : T{
    return arr[0]
}

console.log(first([23,34,23]))
console.log(first(["23","34","23"]))
console.log(first([true, false]))

interface ApiResponse<T>{
    success : boolean;
    data : T;
}

const rest1 : ApiResponse<string> = {success : true , data : "Hello"}
const rest2 : ApiResponse<number[]> = {success : true , data : [1,2,3]}