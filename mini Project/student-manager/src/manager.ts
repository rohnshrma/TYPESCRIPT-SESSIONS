import {Student , Course} from "./student.ts"

export class StudentManager{
    private students : Student[] = []
    private nextId : number = 1

    add(name : string, course : Course , marks : number , email?:String) : Student{
        const student : Student = {id : this.nextId++ , name , course, marks, email};
        this.students.push(student)
        return student;
    }


    findByName(name : string) : Student | undefined{
        return this.students.find(s => s.name.toLowerCase() === name.toLowerCase())
    }
    list() : Student[]{
    return this.students
    }
    topper() : Student | undefined{
        if(this.students.length === 0) return undefined
        return this.students.reduce((best, s) =>s.marks > best.marks? s : best)
    }

    average() : number{
        if (this.students.length === 0) return 0;
        const total = this.students.reduce((sum, s) => sum+ s.marks , 0)
        return total / this.students.length
    }

byCourse(course : Course) : Student[]{
    return this.students.filter(s => s.course === course)
}


}


