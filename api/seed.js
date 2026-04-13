import { connectToDatabase } from './lib/db.js';
import { Product } from './lib/models.js';
import { products } from '../src/data/mockData.js';

export default async function handler(req, res) {
  if (req.method !== 'GET' && req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    await connectToDatabase();
    
    // Clear out any old products to avoid duplicates
    await Product.deleteMany({});
    
    // Insert fresh catalog directly from the mock data
    const inserted = await Product.insertMany(products);
    
    return res.status(200).json({ 
      success: true, 
      message: `Successfully seeded ${inserted.length} premium products into the live MongoDB cluster!`,
      status: "Database is now ACTIVE"
    });
  } catch (error) {
    console.error('Seed Error:', error);
    return res.status(500).json({ success: false, message: 'Database Seed Failed', error: error.message });
  }
}
