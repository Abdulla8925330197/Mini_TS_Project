import express, { Application } from 'express';
import attendanceRoutes from './attendances';
import employeeRoutes from './employee';

const app: Application = express();

app.use(express.json());  // Middleware to parse JSON requests

// Register routes
app.use('/attendance', attendanceRoutes);
app.use('/employee', employeeRoutes);

export default app;
