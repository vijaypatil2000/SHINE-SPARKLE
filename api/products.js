import { connectToDatabase } from './lib/db.js';
import { Product } from './lib/models.js';
import { products as fallbackProducts } from '../src/data/mockData.js';

export default async function handler(req, res) {
  try {
    // Attempt database connection
    await connectToDatabase();

    if (req.method === 'GET') {
      const products = await Product.find({}).sort({ id: 1 });
      
      // If DB is empty, use fallbacks
      if (!products || products.length === 0) {
        return res.status(200).json(fallbackProducts);
      }
      return res.status(200).json(products);
    }

    if (req.method === 'POST') {
      const { title, price, category, description, image } = req.body;
      const lastProduct = await Product.findOne().sort({ id: -1 });
      const nextId = lastProduct ? lastProduct.id + 1 : 1;

      const newProduct = new Product({
        id: nextId,
        title,
        price: Number(price),
        category,
        description,
        image,
        rating: 4.5,
      });

      await newProduct.save();
      return res.status(201).json(newProduct);
    }

    if (req.method === 'DELETE') {
      const { id } = req.query;
      await Product.findOneAndDelete({ id: Number(id) });
      return res.status(200).json({ message: 'Product deleted' });
    }

    return res.status(405).json({ message: 'Method Not Allowed' });
  } catch (error) {
    console.warn('Backend connection error, using local fallback:', error.message);
    if (req.method === 'GET') {
      return res.status(200).json(fallbackProducts);
    }
    return res.status(500).json({ message: 'Database Error', error: error.message });
  }
}
