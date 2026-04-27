import dns from 'dns';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { products } from './src/data/mockData.js';

dotenv.config();

// Force DNS resolution for the cluster to bypass local ISP blocks
dns.setServers(['8.8.8.8', '8.8.4.4']);

const productSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  title: { type: String, required: true },
  description: { type: String },
  image: { type: String },
  category: { type: String },
  price: { type: Number, required: true },
  oldPrice: { type: Number },
  rating: { type: String },
  reviews: { type: Number },
  tags: [String]
});

// Avoid OverwriteModelError
const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

async function seed() {
  try {
    const uri = process.env.MONGODB_URI;
    console.log('Connecting to MongoDB Atlas using forced DNS...');
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 10000 });
    console.log('Connected to DB...');
    
    // Clear existing products
    await Product.deleteMany({});
    console.log('Cleared existing products.');

    // Insert all from mockData
    await Product.insertMany(products);
    console.log(`Successfully seeded ${products.length} properly categorized products!`);
    
    process.exit(0);
  } catch (err) {
    console.error('Seed Error:', err);
    process.exit(1);
  }
}

seed();
