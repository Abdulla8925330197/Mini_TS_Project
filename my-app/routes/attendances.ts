// src/routes/attendance.route.ts

import { Router } from 'express';
import {
  createAttendance,
  getAllAttendance,
  getAttendanceByEmployee,
  updateAttendance,
  deleteAttendance,
  getlimitedAttendance
} from '../controllers/att'; //  Make sure the file is correctly named 'att.ts' or rename it

import { authenticateToken } from '../middleware/attendance.auth'; //  Correct folder name: 'middlewares'

// Initialize router
const router: Router = Router();

//  Routes with JWT auth middleware
router.post('/auth', authenticateToken, createAttendance);
router.get('/', authenticateToken, getAllAttendance);
router.get('/limit', authenticateToken, getlimitedAttendance);
router.get('/employee/:employeeId', authenticateToken, getAttendanceByEmployee);
router.put('/:id', authenticateToken, updateAttendance);
router.delete('/:id', authenticateToken, deleteAttendance);

export default router;
