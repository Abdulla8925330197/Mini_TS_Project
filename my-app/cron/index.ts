import attendanceJob from './attendance.jobs';

export function startAllCronJobs() {
  attendanceJob.start(); // Start the 9 AM attendance job
}
