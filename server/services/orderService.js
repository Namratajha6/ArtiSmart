import Order from '../models/Order.js';
import Product from '../models/Product.js';

export const createOrder = async (orderData, userId) => {
  // Validate stock availability
  for (const item of orderData.items) {
    const product = await Product.findById(item.product);
    if (!product || product.stock < item.quantity) {
      throw new Error(`Insufficient stock for product: ${product?.name || 'Unknown product'}`);
    }
  }

  // Create order and update stock
  const order = new Order({
    ...orderData,
    user: userId
  });

  await order.save();

  // Update product stock
  for (const item of orderData.items) {
    await Product.findByIdAndUpdate(item.product, {
      $inc: { stock: -item.quantity }
    });
  }

  return order;
};

export const updateOrderStatus = async (orderId, status) => {
  const order = await Order.findById(orderId);
  
  if (!order) {
    throw new Error('Order not found');
  }

  order.status = status;
  await order.save();
  return order;
};