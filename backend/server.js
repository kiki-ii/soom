import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import workRoutes from './routes/work.route.js';
import serviceRoutes from './routes/service.route.js';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

dotenv.config();
app.use(cors());
app.use(express.json());
app.use('/api/works', workRoutes);
app.use('/api/services', serviceRoutes);



if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/dist')))
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'))
  })
};


app.listen(PORT, () => {
  connectDB();
  console.log('Server started at http://localhost:' + PORT);
  
});