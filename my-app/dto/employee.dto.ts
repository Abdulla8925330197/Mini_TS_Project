export interface User{
   
    id:number;
    name:string;
    email:string;
    updatedAt?:Date|undefined;
    createdAt?:Date|undefined;
    save():void;
    destroy():void;
}
// export interface user{
//     id:number;
//     name:string;
//     email:string;
//     updatedAt?:Date|undefined;
//     createdAt?:Date|undefined;
// }

export interface data{
    name:string;
    email:string;
}