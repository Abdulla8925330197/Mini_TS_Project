import { Employees } from '../models';
import { User, data } from '../dto/employee.dto';


export const createEmployee = async (body: data): Promise<User> => {
  const newEmployee = await Employees.create({
    name: body.name,
    email: body.email,
  });
  return newEmployee;
};


export const getAllEmployees = async (): Promise<User[]> => {
  try{
    const getAllAttendance = await Employees.findAll();
    console.log(getAllAttendance)
return getAllAttendance
  }catch(error){
console.log(error)
return []
  }
  ;
};


export const getEmployeeById = async (id: number): Promise<User | null> => {
  try{
 const getEmployeeById=await Employees.findByPk(id);
 console.log(getEmployeeById)
 return getEmployeeById
  }catch(error){
console.log(error)
return null;
  }
  
};


export const updateEmployee = async (id: number, updateData: data): Promise<User | null> => {
  try{
    const updateEmployee = await Employees.findByPk
console.log(updateEmployee)
  }catch(error ){
console.log(error)
  }
  const employee = await Employees.findByPk(id);
  if (!employee) return null;

  employee.name = updateData.name || employee.name;
  employee.email = updateData.email || employee.email;
  await employee.save();

  return employee;
};


export const deleteEmployee = async (id: number): Promise<boolean> => {
  const employee = await Employees.findByPk(id);
  if (!employee) return false;

  await employee.destroy();
  return true;
};
