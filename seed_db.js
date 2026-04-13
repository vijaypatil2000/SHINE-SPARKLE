import { connectToDatabase } from './api/lib/db.js';
import { Product } from './api/lib/models.js';
import { products } from './src/data/mockData.js';
import dotenv from 'dotenv';

dotenv.config();

async function seed() {
  try {
    await connectToDatabase();
    console.log('Connected to DB...');
    
    // Clear existing products
    await Product.deleteMany({});
    console.log('Cleared existing products.');

    // Insert all from mockData
    await Product.insertMany(products);
    console.log(`Successfully seeded ${products.length} products!`);
    
    process.exit(0);
  } catch (err) {
    console.error('Seed Error:', err);
    process.exit(1);
  }
}

seed();
