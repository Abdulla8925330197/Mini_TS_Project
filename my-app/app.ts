import express from 'express';
import path from 'path';
import logger from 'morgan';
import fs from 'fs';
import yaml from 'yaml';
import swaggerUi from 'swagger-ui-express';
//import startAllCronJobs from './cron/index'

// import employeeRouter from './routes/attendances';
// import attendanceRouter from './routes/employee';
import index from './routes/index'
import router from './routes/attendances';

const app = express();

// Swagger setup
const swaggerFile = fs.readFileSync(path.join(__dirname, './swagger/swagger.yaml'), 'utf8');
const swaggerDocument = yaml.parse(swaggerFile);
app.use('/yaml', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/api',index)
// app.use('/employee', router);
// app.use('/attendance', attendanceRouter);

export default app;
