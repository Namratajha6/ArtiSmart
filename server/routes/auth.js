import express from 'express';
import { auth } from '../middleware/auth.js';
import * as authService from '../services/authService.js';

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const { user, token } = await authService.registerUser(req.body);
    res.status(201).json({ user, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { user, token } = await authService.loginUser(req.body.email, req.body.password);
    res.json({ user, token });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

export default router;