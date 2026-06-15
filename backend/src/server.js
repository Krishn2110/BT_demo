import dns from 'dns';
dns.setServers(['8.8.8.8', '1.1.1.1']);

import dotenv from 'dotenv';
import { app } from './app.js';
import connectDB from './config/db.js';

dotenv.config();

connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started in [${process.env.NODE_ENV || 'development'}] mode on port ${PORT}`);
});
