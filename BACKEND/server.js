import express from 'express';
import conDB from './config/db.js';
import dotenv from 'dotenv';
import routes from './routes/routes.js';
import cors from 'cors';

dotenv.config();
conDB();

const app = express();
app.use(cors());  
app.use(express.json());

app.use('/api/auth', routes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is online on ${PORT}`));