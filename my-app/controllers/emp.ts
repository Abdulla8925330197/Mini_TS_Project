import { Request, Response } from 'express';
import { Employees } from '../models';
import {User,data} from './emp.dto'



export const createEmployee = async (req: Request, res: Response) => {
  try {
    const body:data = req.body;
 
    const newEmployee:User= await Employees.create({
   name:body.name,
   email:body.email
    });
    res.status(201).json(newEmployee);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating employee' });
  }
};

export const getEmployees = async (req: Request, res: Response) => {
  try {
    const employees:User[] = await Employees.findAll();
    res.status(200).json(employees);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching employees' });
  }
};

export const getEmployeeById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const employee:User | null = await Employees.findByPk(id);
    if (!employee) {
      res.status(404).json({ message: 'Employee not found' });
      return;
    }
    res.status(200).json(employee);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching employee' });
  }
};

export const updateEmployee = async (req: Request, res: Response): Promise<void> => {
  const  id:number  = parseInt(req.params.id) ;
  const  data:User  = req.body;
  try {
    const employee:User|null = await Employees.findByPk(id);
    if (!employee) {
      res.status(404).json({ message: 'Employee not found' });
      return;
    }
    employee.name = data.name || employee.name;
    employee.email = data.email || employee.email;
    await employee.save();
    res.status(200).json(employee);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating employee' });
  }
};

export const deleteEmployee = async (req: Request, res: Response): Promise<void> => {
  const id:number =parseInt( req.params.id);
  try {
    const employee:User |null = await Employees.findByPk(id);
    if (!employee) {
      res.status(404).json({ message: 'Employee not found' });
      return;
    }
    await employee.destroy();
    res.status(200).json({ message: 'Employee deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting employee' });
  }
};
