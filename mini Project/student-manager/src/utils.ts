export function printList<T>(title : string , items : T[]): void{
    console.log(`\n--- ${title} ---`)
    if(items.length === 0){
        console.log("No Data Found")
        return
    }
    items.forEach(item=> console.log(item))
}