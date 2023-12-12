import express from 'express';
import { getCategories } from '../controllers/category';

/* ==========================
		Route: /api/categories
========================== */
const router = express.Router();

// 카테고리 가져오기
router.get('/', getCategories);

export default router;
