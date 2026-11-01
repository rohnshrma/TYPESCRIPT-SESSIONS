export type Course = "MERN" | "Data Analytics" | "Python"

export interface Student {
    readonly id : number;
    name : string;
    course : Course;
    marks : number;
    email?:string;
}
