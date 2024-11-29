import express from 'express';
import { auth, isArtisan } from '../middleware/auth.js';
import * as productService from '../services/productService.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const products = await Product.find()
      .populate('artisan', 'name')
      .sort('-createdAt');
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate('artisan', 'name')
      .populate('reviews.user', 'name');
    
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    const recommendations = await productService.getRecommendedProducts(req.params.id);
    res.json({ product, recommendations });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', auth, isArtisan, async (req, res) => {
  try {
    const product = await productService.createProduct(req.body, req.user._id);
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.patch('/:id', auth, isArtisan, async (req, res) => {
  try {
    const product = await productService.updateProduct(req.params.id, req.user._id, req.body);
    res.json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;