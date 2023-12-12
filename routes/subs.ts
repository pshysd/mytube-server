import express from 'express';
import { countSubs, isSubs, toggleSubs } from '../controllers/subs';
import { isLoggedIn } from '../middlewares';
/* ==========================
		Route: /api/subs
========================== */
const router = express.Router();

// 구독하기
router.post('/', isLoggedIn, toggleSubs);

// 구독 여부를 반환
router.get('/:userTo/:userFrom', isLoggedIn, isSubs);

// 구독자 수
router.get('/count', countSubs);

export default router;
