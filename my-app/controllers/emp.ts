import { Request, Response } from 'express';
import * as employeeService from '../services/employee.service';
import { data } from '../dto/employee.dto';

export const createEmployee = async (req: Request, res: Response) => {
  try {
    const body: data = req.body;
    const newEmployee = await employeeService.createEmployee(body);
    res.status(201).json(newEmployee);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating employee' });
  }
};

export const getEmployees = async (req: Request, res: Response) => {
  try {
    const employees = await employeeService.getAllEmployees();
    res.status(200).json(employees);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching employees' });
  }
};

export const getEmployeeById = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    const employee = await employeeService.getEmployeeById(id);
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
  try {
    const id = parseInt(req.params.id);
    const body: data = req.body;
    const employee = await employeeService.updateEmployee(id, body);
    if (!employee) {
      res.status(404).json({ message: 'Employee not found' });
      return;
    }
    res.status(200).json(employee);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating employee' });
  }
};

export const deleteEmployee = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    const deleted = await employeeService.deleteEmployee(id);
    if (!deleted) {
      res.status(404).json({ message: 'Employee not found' });
      return;
    }
    res.status(200).json({ message: 'Employee deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting employee' });
  }
};
