class Person{
    constructor(public name : string){}

    intro(): string {
        return `I am ${this.name}`
    }

}

class Teacher extends Person{
    constructor(name : string , public subject : string){
        super(name);
    }
    intro(): string{
        return `${super.intro()} and i teach ${this.subject}`
    }

}


    const t1 = new Teacher("Rohan","Typescript")
    console.log(t1.intro())





    abstract class Shape{
        abstract area(): number
    }

    class Rectangle extends Shape{
        constructor(public length : number , public width : number){
            super()
        }

        area(): number {
            return this.length * this.width
        }
    }


    const r = new Rectangle(5,4)
    console.log(r.area())