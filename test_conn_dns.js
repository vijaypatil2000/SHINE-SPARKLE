import dns from 'dns';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

// Force DNS resolution for the cluster
dns.setServers(['8.8.8.8', '8.8.4.4']);

async function test() {
  try {
    const uri = process.env.MONGODB_URI;
    console.log('Testing connection (Forced DNS) to:', uri.replace(/:([^@]+)@/, ':****@'));
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
    console.log('SUCCESS! Connected to MongoDB Atlas.');
    process.exit(0);
  } catch (err) {
    console.error('FAILED:', err.message);
    process.exit(1);
  }
}

test();
