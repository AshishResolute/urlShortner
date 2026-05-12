import express from 'express';
import { addUrl, deleteUrl, getUserUrls, redirectUrl } from '../controllers/url.controller.js';
import { authenticate } from '../middlewares/authenticate.js';
const router = express.Router();

router.post('/',authenticate,addUrl)
router.get('/:short_code',redirectUrl)
router.get('/',authenticate,getUserUrls)
router.delete('/:short_code',authenticate,deleteUrl)

export default router;