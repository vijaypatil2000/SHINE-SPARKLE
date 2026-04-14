import crypto from 'crypto';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
     return res.status(400).json({ message: 'Missing parameters for verification' });
  }

  try {
    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    
    // Create HMAC SHA256 signature using the secret secret key
    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET || 'mock_secret')
      .update(sign.toString())
      .digest("hex");

    if (razorpay_signature === expectedSign) {
      // Payment completely verified.
      // E-commerce standard is to write order into the formal database here.
      return res.status(200).json({ message: 'Payment verified successfully' });
    } else {
      return res.status(400).json({ message: 'Invalid payment signature sent!' });
    }
  } catch (error) {
    console.error('Error verifying Razorpay signature:', error);
    return res.status(500).json({ message: 'Internal Server Error verification failure' });
  }
}
