import { Router } from 'express';
import {
  createAttendance,
  getAllAttendance,
  getAttendanceByEmployee,
  updateAttendance,
  deleteAttendance,
  getlimitedAttendance
} from '../controllers/att';

const router: Router = Router();

router.get('/limit',getlimitedAttendance)
router.post('/', createAttendance);
router.get('/', getAllAttendance);
router.get('/employee/:employeeId', getAttendanceByEmployee);
router.put('/:id', updateAttendance);
router.delete('/:id', deleteAttendance);


export default router;
