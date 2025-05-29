import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import workRoutes from './routes/work.route.js';
import path from 'path';

import multer from 'multer';
import fs from 'fs';

const app = express();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

dotenv.config();
app.use(cors());
app.use(express.json());
app.use('/api/works', workRoutes);


// 업로드 디렉토리 생성
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // cb(null, __dirname + 'uploads/');   // 절대경로 파일 저장 위치
    cb(null, 'uploads/');               // 상대경로 파일 저장 위치
    // cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    // 허용 확장자 체크
    const allowedExts = ['.jpg', '.jpeg', '.png', '.gif', '.pdf'];
    if (!allowedExts.includes(ext.toLowerCase())) {
      return cb(new Error('허용되지 않는 파일 형식입니다.'), false);
    }

    cb(null, Date.now() + '-' + file.originalname + ext );
  }
});

const upload = multer({ storage : storage });

app.post('/api/works/upload', upload.single('file'), (req, res) => {

  try {
    if (!req.file) {return res.status(400).json({ error: '파일이 제공되지 않았습니다.' });
    }
    
    const { title, description} = req.body;
    const filePath = path.join('uploads', req.file.filename); // 상대 경로 저장
        
    res.status(201).json({
      success: true,
      message: '파일 및 텍스트 업로드 성공',
      fileInfo: {
        originalName: req.file.originalname,
        fileName: req.file.filename,
        size: req.file.size,
        path: filePath
      },
      formData: { title, description }
    });
    
  } catch (error) {
    console.error('업로드 처리 오류:', error);
    // if (req.file && fs.existsSync(req.file.path)) {
    //   fs.unlinkSync(req.file.path);
    // }
    res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
      
});





app.post('/api/works/multipart', upload.array('file',5), (req, res) => {
  // console check
  req.files.map((data) => {
    console.log(data);
      
  });
    
  res.status(200).send({
    message: "Ok",
    fileInfo: req.files,
    // path:filePath
  })
  console.log(path);
});


if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend')))
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'))
  })
};


app.listen(PORT, () => {
  connectDB();
  console.log('Server started at http://localhost:' + PORT);
  
});