import app from './config/server';
import initDB from './config/database';
import dotenv from 'dotenv';

initDB();
dotenv.config();

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log('SERVER LISTENING ON PORT', PORT));