import express from 'express';
import { addUrl, getUserUrls, redirectUrl } from '../controllers/url.controller.js';
import { authenticate } from '../middlewares/authenticate.js';
const router = express.Router();

router.post('/',authenticate,addUrl)
router.get('/:short_code',redirectUrl)
router.get('/',authenticate,getUserUrls)
export default router;