import request from 'supertest';
import app from '../app'; // Your Express app
import * as AttendanceService from '../services/attendence.service';

jest.mock('../services/attendence.service');

describe('Attendance Controller', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /attendance', () => {
    it('should return all attendance records', async () => {
      const mockData = [{ id: 1, employee_id: 1, status: 'Present' }];
      (AttendanceService.getAllAttendance as jest.Mock).mockResolvedValue(mockData);

      const response = await request(app).get('/attendance');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockData);
    });

    it('should return 404 when no records', async () => {
      (AttendanceService.getAllAttendance as jest.Mock).mockResolvedValue([]);

      const response = await request(app).get('/attendance');

      expect(response.status).toBe(404);
      expect(response.body.message).toBe('No attendance records found');
    });
  });

  describe('POST /attendance', () => {
    it('should create a new attendance record', async () => {
      const input = { employee_id: 1, date: '2025-06-16', status: 'Present' };
      const mockCreated = { id: 1, ...input };

      (AttendanceService.createAttendance as jest.Mock).mockResolvedValue(mockCreated);

      const response = await request(app).post('/attendance').send(input);

      expect(response.status).toBe(201);
      expect(response.body).toEqual(mockCreated);
    });

    it('should return 500 on error', async () => {
      (AttendanceService.createAttendance as jest.Mock).mockRejectedValue(new Error('DB error'));

      const response = await request(app).post('/attendance').send({});

      expect(response.status).toBe(500);
      expect(response.body.message).toBe('Error creating attendance');
    });
  });

  describe('GET /attendance/employee/:employee_id', () => {
    it('should return attendance for a specific employee', async () => {
      const mockData = [{ id: 1, employee_id: 1, status: 'Present' }];
      (AttendanceService.getAttendanceByEmployee as jest.Mock).mockResolvedValue(mockData);

      const response = await request(app).get('/attendance/employee/1');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockData);
    });

    it('should return 404 if none found', async () => {
      (AttendanceService.getAttendanceByEmployee as jest.Mock).mockResolvedValue([]);

      const response = await request(app).get('/attendance/employee/1');

      expect(response.status).toBe(404);
      expect(response.body.message).toBe('No attendance records found for this employee');
    });
  });

  
});
