import express from 'express';
import { login, logout, refresh, signUp } from '../controllers/auth.controller.js';
const router = express.Router();

router.post('/signUp',signUp)
router.post('/login',login)
router.post('/refresh',refresh)
router.post('/logout',logout)

export default router;