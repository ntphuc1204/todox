// config/db.js
import mongoose from 'mongoose';

export const connectDB = async (callback) => { 
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected successfully');
    if (callback) callback();
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};
