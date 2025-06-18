// controllers/attendance.controller.ts
import { Request, Response } from 'express';
import * as AttendanceService from '../services/attendence.service';
import { data } from '../dto/attendance.dto';

export const createAttendance = async (req: Request, res: Response): Promise<void> => {
  const datas: data = req.body;
  try {
    const attendance = await AttendanceService.createAttendance(datas);
    res.status(201).json(attendance);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating attendance' });
  }
};

export const getAllAttendance = async (req: Request, res: Response): Promise<void> => {
  try {
    const attendance = await AttendanceService.getAllAttendance();
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
    const limit = parseInt(req.query.limit as string) || 10;
    const offset = parseInt(req.query.offset as string) || 0;

    const { rows, count } = await AttendanceService.getlimitedAttendance(limit, offset);

    if (rows.length === 0) {
      res.status(404).json({ message: 'No attendance records found' });
      return;
    }

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
  const employeeId = parseInt(req.params.employee_id);
  try {
    const attendance = await AttendanceService.getAttendanceByEmployee(employeeId);
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
  const id = parseInt(req.params.id);
  const { status } = req.body;

  try {
    const attendance = await AttendanceService.updateAttendance(id, status);
    if (!attendance) {
      res.status(404).json({ message: 'Attendance record not found' });
      return;
    }

    res.status(200).json(attendance);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating attendance record' });
  }
};

export const deleteAttendance = async (req: Request, res: Response): Promise<void> => {
  const id = parseInt(req.params.id);
  try {
    const success = await AttendanceService.deleteAttendance(id);
    if (!success) {
      res.status(404).json({ message: 'Attendance record not found' });
      return;
    }

    res.status(200).json({ message: 'Attendance record deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting attendance record' });
  }
};
