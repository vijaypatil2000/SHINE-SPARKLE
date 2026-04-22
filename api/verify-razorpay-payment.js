import crypto from 'crypto';
import connectToDatabase from './lib/db.js';
import { Order } from './lib/models.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderDetails } = req.body;

  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
     return res.status(400).json({ message: 'Missing parameters for verification' });
  }

  try {
    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    
    // Create HMAC SHA256 signature using the secret secret key
    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(sign.toString())
      .digest("hex");

    if (razorpay_signature === expectedSign) {
      // Payment completely verified. Let's record the order in MongoDB.
      try {
        await connectToDatabase();
        if (orderDetails) {
          const newOrder = new Order({
            orderId: `ORD-${Math.floor(Math.random() * 1000000)}`,
            customer: orderDetails.address,
            items: orderDetails.items,
            totalAmount: orderDetails.totalAmount,
            paymentMode: orderDetails.paymentMethod,
            paymentToken: razorpay_payment_id,
            status: 'Pending'
          });
          await newOrder.save();
        }
      } catch (dbErr) {
        console.error("Warning: DB save failed, but payment successful.");
      }

      return res.status(200).json({ message: 'Payment verified successfully' });
    } else {
      return res.status(400).json({ message: 'Invalid payment signature sent!' });
    }
  } catch (error) {
    console.error('Error verifying Razorpay signature:', error);
    return res.status(500).json({ message: 'Internal Server Error verification failure' });
  }
}
