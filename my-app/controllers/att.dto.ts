

export interface user{
   
    id:number;
    employee_id:number;
    date:string|null;
    status:string;
    createdAt?:Date|undefined;
    updatedAt?:Date|undefined;
    save():void;
    destroy():void;
}

export interface data{
    employeeId:number;
    att_id:number;
    status:string;
    date:string;
}