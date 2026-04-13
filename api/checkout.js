import { connectToDatabase } from './lib/db.js';
import { Order } from './lib/models.js';
import { sendAdminEmail, sendCustomerEmail } from './lib/mailer.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const { items, totalAmount, address = {}, paymentMethod = 'Unknown' } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    // Try connecting to DB and saving order
    try {
      await connectToDatabase();
      const newOrder = new Order({
        items,
        totalAmount
      });
      await newOrder.save();
      
      const orderDetails = { _id: newOrder._id, items, totalAmount, address, paymentMethod };
      await Promise.all([
        sendAdminEmail(orderDetails),
        sendCustomerEmail(orderDetails)
      ]).catch(e => console.error("Notification Error:", e));

      return res.status(201).json({ message: 'Order placed successfully!', orderId: newOrder._id });
    } catch (dbError) {
      console.warn("Database not connected. Simulating checkout success.", dbError.message);
      
      const mockId = `mock_${Date.now()}`;
      const orderDetails = { _id: mockId, items, totalAmount, address, paymentMethod };
      await Promise.all([
        sendAdminEmail(orderDetails),
        sendCustomerEmail(orderDetails)
      ]).catch(e => console.error("Notification Error:", e));

      // Fallback simulation so frontend works even without MongoDB configured
      return res.status(201).json({ message: 'Mock order placed successfully! (Setup MongoDB for real orders)', orderId: mockId });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
