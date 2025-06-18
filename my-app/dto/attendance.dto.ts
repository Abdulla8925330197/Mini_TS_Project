

export interface AttendanceDto {
  id: number;
  employee_id: number;
  date: string | null;
  status: string;
  createdAt?: Date;
  updatedAt?: Date;
  save(): void;
  destroy(): void;
}


export interface data{
    employeeId:number;
    att_id:number;
    status:string;
    date:string;
}

export type limitPage<T>={
    count:number;
    rows:T[];
}

// export interface AttendanceAttributes {
//   id: number;
//   employee_id: number;
//   date: Date;
//   status: string;
//   // add other fields as needed
// }
