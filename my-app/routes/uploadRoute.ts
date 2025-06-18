 // src/routes/uploadRoute.ts
import express, { Request, Response } from 'express';
import upload from '../controllers/img-upl';

const router = express.Router();

router.post('/upload', upload.single('file'), (req: Request, res: Response):void => {
  if (!req.file) {
     res.status(400).json({ message: 'No file uploaded' });
  }
  res.json({
    message: 'File uploaded successfully',
    file: req.file,
  });
});

export default router;
