import request from "supertest";
import app from "../app";
import * as employeeService from "../services/employee.service";
import { response } from "express";

jest.mock("../services/employee.service");

describe('GET /employees/:id', () => {
  it('should return employee by ID', async () => {
    const mockEmployee = { id: 1, name: "abd", email: "abd@gmail.com" };

    (employeeService.getEmployeeById as jest.Mock).mockResolvedValue(mockEmployee);

    const response = await request(app).get("/employees/1");

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockEmployee);
  });

  it('should return 404 if employee not found', async () => {
    (employeeService.getEmployeeById as jest.Mock).mockResolvedValue(null);

    const response = await request(app).get("/employees/1");

    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Employee not found');
  });

  it('should return 500 on service error', async () => {
    (employeeService.getEmployeeById as jest.Mock).mockRejectedValue(new Error("DB error"));

    const response = await request(app).get("/employees/1");

    expect(response.status).toBe(500);
    expect(response.body.message).toBe('Error fetching employee');
  });
});
