import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

async function test() {
  try {
    const uri = process.env.MONGODB_URI;
    console.log('Testing connection to:', uri.replace(/:([^@]+)@/, ':****@'));
    await mongoose.connect(uri);
    console.log('SUCCESS! Connected to MongoDB Atlas.');
    process.exit(0);
  } catch (err) {
    console.error('FAILED:', err.message);
    process.exit(1);
  }
}

test();
