import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  title: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String },
  image: { type: String },
  category: { type: String },
  rating: { type: Number, default: 0 },
  tags: [{ type: String }],
});

// Since Vercel Serverless Functions can boot rapidly in parallel, we need to check if the model already exists
const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

const orderSchema = new mongoose.Schema({
  orderId: { type: String, required: true, unique: true },
  customer: {
    name: String,
    email: String,
    phone: String,
    address: String,
  },
  items: [
    {
      productId: Number,
      title: String,
      price: Number,
      quantity: Number,
    }
  ],
  totalAmount: { type: Number, required: true },
  paymentMode: { type: String, required: true }, // 'CARD', 'DEBIT', 'UPI', 'COD'
  paymentToken: { type: String }, // razorpay order id or payment id
  status: { type: String, default: 'Pending' }, // 'Pending', 'Shipped', 'Closed'
  createdAt: { type: Date, default: Date.now },
});

const Order = mongoose.models.Order || mongoose.model('Order', orderSchema);

export { Product, Order };
