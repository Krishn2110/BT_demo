import dns from 'dns';
dns.setServers(['8.8.8.8', '1.1.1.1']);

import dotenv from 'dotenv';
import { app } from './app.js';
import connectDB from './config/db.js';

// Load environment configuration from .env file
dotenv.config();

// Establish connection to MongoDB database
connectDB();

// Determine server port
const PORT = process.env.PORT || 5000;

// Start listening for incoming connections
app.listen(PORT, () => {
  console.log(`Server started in [${process.env.NODE_ENV || 'development'}] mode on port ${PORT}`);
});
