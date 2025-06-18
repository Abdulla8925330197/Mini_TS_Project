import express from 'express';
import {
  createEmployee,
  getEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
} from '../controllers/emp';

import { upload } from '../middleware/upload.csv'; // ✅ Your multer middleware
import importEmployees from '../utils/csv/importEmployees'; // ✅ CSV importer function
import { promises } from 'dns';

const router = express.Router();

// 🚀 Existing CRUD routes
router.post('/', createEmployee);
router.get('/', getEmployees);
router.get('/:id', getEmployeeById);
router.put('/:id', updateEmployee);
router.delete('/:id', deleteEmployee);

// 🆕 CSV Upload Route
router.post('/upload-csv', upload.single('file'), async (req, res):Promise<void> =>{
  try {
    if (!req.file) {
       res.status(400).json({ message: 'CSV file is required' });
    }

    interface MulterRequest extends Request {
  file: Express.Multer.File;
}

const uploadCSV = async (req: MulterRequest, res: Response): Promise<void> => {
  const filePath = req.file.path; // no error now
  res.status(200).json({ message: 'Employees imported from CSV successfully' });
};
  


    
  } catch (error) {
    console.error('CSV Upload Error:', error);
    res.status(500).json({ message: 'CSV upload failed', error });
  }
});

export default router;
