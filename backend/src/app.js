import express from 'express';
import dotenv from 'dotenv';
import authRouter from './routes/auth.route.js';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());


app.use('/api/auth', authRouter)



app.listen(PORT, () => {
  console.log(`✅ Server started on port ${PORT}`);
});
