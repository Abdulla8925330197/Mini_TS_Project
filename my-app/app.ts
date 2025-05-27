import createError from 'http-errors';
import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

import indexRouter from './routes/index';
//import attendanceRoutes from './routes/attendances'; // Uncommented and added attendance routes

const app = express();
app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Routes setup
app.use('/', indexRouter); // Index routes
//app.use('/api/attendance', attendanceRoutes); // Corrected path for attendance routes

// 404 handler (for unknown routes)
app.use((req: Request, res: Response, next: NextFunction) => {
  next(createError(404));
});

// Error handler (for errors in general)
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500).json({err});
});

export default app;
