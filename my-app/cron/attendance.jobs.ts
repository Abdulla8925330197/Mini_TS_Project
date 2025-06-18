import cron from 'node-cron';
import { markDailyAttendance } from '../services/attendence.service';

const attendanceJob = cron.schedule('0 9 * * *', async () => {
  console.log(" Cron: Marking attendance at  9pm ...");
  await markDailyAttendance();
});

export default attendanceJob;
