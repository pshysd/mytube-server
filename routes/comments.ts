import express from 'express';
import { getComments, createComment } from '../controllers/comment';

/* ==========================
		Routes: /api/comments
========================= */
const router = express.Router();

// 해당 비디오의 댓글 가져오기
router.get('/:videoId', getComments);

// 댓글 작성하기
router.post('/', createComment);

export default router;
