import { connectToDatabase } from './lib/db.js';
import { Product } from './lib/models.js';

// Fallback products in case the database is unreachable
const fallbackProducts = [
  { id: 1, title: 'Imperial Gold Plated Choker Set', category: 'NECKLACE', price: 199, description: 'A stunning piece of artistry.', image: '/img/IMG_2450.jpg' },
  { id: 2, title: 'Royal Kundan Studded Long Haram', category: 'NECKLACE', price: 222, description: 'Experience the elegance.', image: '/img/IMG_2452.jpg' },
  { id: 3, title: 'Heritage Polki Finish Neck Set', category: 'NECKLACE', price: 245, description: 'Timeless addition.', image: '/img/IMG_2455.jpg' },
  { id: 4, title: 'Antique Meenakari Mala', category: 'NECKLACE', price: 268, description: 'Beautifully detailed.', image: '/img/IMG_2458.jpg' },
  { id: 17, title: 'Vintage Polki Finish Studs', category: 'EARRINGS', price: 567, description: 'Experience elegance.', image: '/img/IMG_2505.jpg' },
  { id: 63, title: 'Heritage Matte Gold Bangle', category: 'BANGLES & BRACELETS', price: 875, description: 'Traditional motifs.', image: '/img/collection_2/WhatsApp Image 2026-04-11 at 5.27.37 PM (2).jpeg' },
];

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
