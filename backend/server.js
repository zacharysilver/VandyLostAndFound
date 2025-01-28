import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import itemRouter from './routes/item.router.js';
import cors from 'cors';

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173' // Replace with your frontend URL
  }));
app.use('/items', itemRouter);
app.listen(3000, () => {
    connectDB();
    console.log('Server running at http://localhost:3000');
}
);

