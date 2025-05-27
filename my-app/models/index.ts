// index.ts
import { Sequelize, DataTypes } from 'sequelize';
import config from '../config/config';
import EmployeeModelFactory from './employees';
import AttendanceModelFactory from './attendance';

const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env];

const sequelize = new Sequelize(dbConfig.database!, dbConfig.username!, dbConfig.password!, {
  host: dbConfig.host,
  dialect: dbConfig.dialect,
});

const Employees = EmployeeModelFactory(sequelize, DataTypes);
const Attendance = AttendanceModelFactory(sequelize, DataTypes);

// Set up associations here
Employees.hasMany(Attendance, { foreignKey: 'employee_id', as: 'attendances' });
Attendance.belongsTo(Employees, { foreignKey: 'employee_id', as: 'employee' });

export { sequelize, Employees, Attendance };
