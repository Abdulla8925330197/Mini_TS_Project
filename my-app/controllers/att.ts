import { Request, Response } from 'express';
import { Attendance } from '../models';
import{user,data}from './att.dto'
import attendance from '../models/attendance';



export const createAttendance = async (req: Request, res: Response): Promise<void> => {
  const datas:data = req.body;
  try {
    const attendance:user = await Attendance.create({
      
      employee_id:datas.employeeId, id: datas.att_id, status: datas.status, date: datas.date
      // updatedAt: 0,
      // createdAt:0
    });
    res.status(201).json(attendance);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating attendance' });
  }
};

export const getAllAttendance = async (req: Request, res: Response): Promise<void> => {
  try {
    const attendance = await Attendance.findAll() as user[];
    if (attendance.length === 0) {
      res.status(404).json({ message: 'No attendance records found' });
      return;
    }
    res.status(200).json(attendance);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching attendance records' });
  }
};

export const getlimitedAttendance = async (req: Request, res: Response): Promise<void> => {
  try {
    // Parse limit and offset from query params
    const limit = parseInt(req.query.limit as string) || 10;   // Default limit = 10
    const offset = parseInt(req.query.offset as string) || 0;  // Default offset = 0

    console.log(req.query.limit)
    
    console.log(req.query.offset)
    // Fetch paginated data
    const { rows, count } = await Attendance.findAndCountAll({
      limit,
      offset,
   });

    if (rows.length === 0) {
      res.status(404).json({ message: 'No attendance records found' });
      return;
    }

    // Respond with pagination data
    res.status(200).json({
      totalRecords: count,
      currentPage: Math.floor(offset / limit) + 1,
      totalPages: Math.ceil(count / limit),
      data: rows,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching attendance records' });
  }
};

export const getAttendanceByEmployee = async (req: Request, res: Response): Promise<void> => {
  const employeeId:number  = parseInt(req.params.employee_id);
  try {
    const attendance = await Attendance.findAll({ where: { employee_id:employeeId } });
    if (attendance.length === 0) {
      res.status(404).json({ message: 'No attendance records found for this employee' });
      return;
    }
    res.status(200).json(attendance);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching attendance records' });
  }
};

export const updateAttendance = async (req: Request, res: Response): Promise<void> => {
  const id:number  = parseInt(req.params.id);
  const  status:string  = req.body;

  try {
    const attendance:user|null = await Attendance.findByPk(id);
    if (!attendance) {
      res.status(404).json({ message: 'Attendance record not found' });
      return;
    }

    attendance.status = status;
    await attendance.save();

    res.status(200).json(attendance);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating attendance record' });
  }
};

export const deleteAttendance = async (req: Request, res: Response): Promise<void> => {
  const id:number =parseInt( req.params.id);
  try {
    const attendance:user|null = await Attendance.findByPk(id);
    if (!attendance) {
      res.status(404).json({ message: 'Attendance record not found' });
      return;
    }

    await attendance.destroy();
    res.status(200).json({ message: 'Attendance record deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting attendance record' });
  }
};
