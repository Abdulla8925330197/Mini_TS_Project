import fs from 'fs';
import csv from 'csv-parser';
import path from 'path';
import importEmployees from '../../models/employees'

interface User {
  id: string;
  name: string;
  email: string;
}

const results: User[] = [];

fs.createReadStream('data.csv')
  .pipe(csv())
  .on('data', (row: User) => {
    results.push(row);
  })
  .on('end', () => {
    console.log('CSV imported:', results);
  });
export default importEmployees;