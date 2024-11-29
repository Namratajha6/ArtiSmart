import express from 'express';
import { auth } from '../middleware/auth.js';
import * as orderService from '../services/orderService.js';

const router = express.Router();

router.post('/', auth, async (req, res) => {
  try {
    const order = await orderService.createOrder(req.body, req.user._id);
    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.patch('/:id/status', auth, async (req, res) => {
  try {
    const order = await orderService.updateOrderStatus(req.params.id, req.body.status);
    res.json(order);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;