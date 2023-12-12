import express from 'express';
import { getPrivacy } from '../controllers/privacy';

/* ==========================
		Route: /api/privacy
========================== */
const router = express.Router();

// 공개 범위 가져오기
router.get('/', getPrivacy);

export default router;
