import express from 'express';
import { addUrl } from '../controllers/url.controller.js';
import { authenticate } from '../middlewares/authenticate.js';
const router = express.Router();

router.post('/',authenticate,addUrl)

export default router;