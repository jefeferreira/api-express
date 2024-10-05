import express from 'express';
import connectDB from './database/db.js';
import userRoutes from './routes/userRoutes.js';
import itemRoutes from './routes/itemRoutes.js';
import dotenv from 'dotenv';

const app = express();
const port = process.env.PORT || 8000;

dotenv.config();

connectDB();

app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api/items', itemRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
