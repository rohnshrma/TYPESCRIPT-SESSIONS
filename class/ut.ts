interface User {
    id : number;
    name : string;
    email : string
}


const update: Partial<User>  = {name : "John doe"}
type UserPreview = Pick<User, "id" | "name">;

type UserWithoutId = Omit<User , id>

const fixedUser : Readonly<User> = {id : 1 , name : "Amit", email : "a@b.com"}
fixedUser.email = "hahaha"