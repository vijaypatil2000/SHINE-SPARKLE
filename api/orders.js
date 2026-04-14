import connectToDatabase from './lib/db.js';
import { Order } from './lib/models.js';

export default async function handler(req, res) {
  await connectToDatabase();

  if (req.method === 'GET') {
    try {
      const orders = await Order.find({}).sort({ createdAt: -1 });
      return res.status(200).json(orders);
    } catch (error) {
      return res.status(500).json({ message: 'Error fetching orders', error });
    }
  }

  if (req.method === 'PUT') {
    // Admin closing or shipping an order
    const { orderId, status } = req.body;
    if (!orderId || !status) return res.status(400).json({ message: 'Missing parameters' });
    
    try {
      const order = await Order.findOneAndUpdate(
        { orderId },
        { status },
        { new: true }
      );
      if (!order) return res.status(404).json({ message: 'Order not found' });
      return res.status(200).json(order);
    } catch (error) {
      return res.status(500).json({ message: 'Error updating order' });
    }
  }

  return res.status(405).json({ message: 'Method not allowed' });
}
