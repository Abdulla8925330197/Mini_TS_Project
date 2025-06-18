// attendance.service.ts
import { Attendance, Employees } from '../models';
import { AttendanceDto, data, limitPage } from '../dto/attendance.dto';

export const createAttendance = async (datas: data): Promise<AttendanceDto> => {
  const attendances = await Attendance.create({
    employee_id: datas.employeeId,
    id: datas.att_id,
    status: datas.status,
    date: datas.date
  });
  return attendances; 
};

export const getAllAttendance = async (): Promise<AttendanceDto[]> => {
  try {
    const getAllAttendance = await Attendance.findAll();
    console.log(getAllAttendance);
    return getAllAttendance;
  } catch (error) {
    console.error("Error fetching all attendance:", error);
    return []; // Safe fallback
  }
};

export const getlimitedAttendance = async (
  limit: number,
  offset: number,
): Promise<limitPage<AttendanceDto>> => {
  return await Attendance.findAndCountAll({ limit, offset });
};

export const getAttendanceByEmployee = async (employeeId: number): Promise<AttendanceDto[]> => {
  try {
    const attendanceRecord = await Attendance.findAll({ where: { employee_id: employeeId } });
    console.log("successful", attendanceRecord);
    return attendanceRecord;
  } catch (error) {
    console.error("Error fetching attendance by employee:", error);
    return []; 
  }
};

export const updateAttendance = async (id: number, status: string): Promise<AttendanceDto | null> => {
  const attendances = await Attendance.findByPk(id);
  if (!attendances) return null;

  attendances.status = status;
  await attendances.save();
  return attendances;
};

export const deleteAttendance = async (id: number): Promise<boolean> => {
  const attendances = await Attendance.findByPk(id);
  if (!attendances) return false;

  await attendances.destroy();
  return true;
};



//  Cron job logic to mark daily attendance at 9:00 AM
export async function markDailyAttendance(): Promise<void> {
  try {
    const today = new Date().toISOString().split("T")[0]; // yyyy-mm-dd format
    const allEmployees = await Employees.findAll();

    for (const emp of allEmployees) {
      await Attendance.findOrCreate({
  where: {
    employee_id: emp.id,
    date: today,
  },
  defaults: {
    employee_id: emp.id,  
    date: today,          
    status: 'Present',    
  },
});

    }

    console.log("Cron: Attendance marked successfully for all employees");
  } catch (error) {
    console.error(" Cron Error: Failed to mark attendance", error);
  }
}
