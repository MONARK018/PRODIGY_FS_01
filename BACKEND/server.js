const express = require('express');
const conDB = require('./config/db');
const dotenv = require('dotenv');
const routes = require('./routes/routes');
const cors = require('cors');

dotenv.config();
conDB();

const app = express();
app.use(cors());  
app.use(express.json());

app.use('/api/auth',routes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>console.log(`Server is online on ${PORT}`));