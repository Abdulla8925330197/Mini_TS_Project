import express, { Application } from 'express';
import attendanceRoutes from './attendances';
import employeeRoutes from './employee';
import sendFile from './uploadRoute';
 import html from './html.route';
const app: Application = express();

app.use(express.json());  
app.use('/html',html);
app.use('/upload',sendFile)
app.use('/attendance', attendanceRoutes);
app.use('/employee', employeeRoutes);

export default app;
