import express from 'express';
import Order from '../models/Order.js';

const router = express.Router();

// --- ADD THIS NEW BLOCK ---
// GET /api/orders - to fetch all orders
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find(); // Find all orders
    console.log('--- ALL ORDERS FETCHED ---');
    res.status(200).json(orders);
  } catch (err) {
    console.error('--- ERROR FETCHING ORDERS ---');
    console.error(err.message);
    res.status(500).json({ message: 'Failed to fetch orders', error: err.message });
  }
});
// -------------------------

// POST /api/orders
router.post('/', async (req, res) => {
  console.log('--- NEW ORDER REQUEST ---');
  console.log('Request Body:', JSON.stringify(req.body, null, 2));

  try {
    const { items, customer, total } = req.body;

    if (!items || !customer || !total) {
      console.log('Validation Failed: Missing items, customer, or total.');
      return res.status(400).json({ message: 'Validation Failed: Missing required fields.' });
    }

    const order = new Order({ items, customer, total });
    const savedOrder = await order.save();

    console.log('Order saved successfully:', savedOrder._id);
    res.status(201).json(savedOrder);

  } catch (err) {
    console.error('--- ERROR SAVING ORDER ---');
    console.error(err.message);
    console.error(err.stack);
    res.status(500).json({ message: 'Failed to place order', error: err.message });
  }
});

export default router;

