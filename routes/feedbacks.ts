import express from 'express';
import { getLikes, getDislikes, toggleLike, toggleDislike, getLikeByUserId, getDislikeByUserId } from '../controllers/feedback';
const router = express.Router();

router.get('/likes', getLikes);

router.get('/dislikes', getDislikes);

router.get('/likes/:userId', getLikeByUserId);

router.get('/dislikes/:userId', getDislikeByUserId);

router.post('/like', toggleLike);

router.post('/dislike', toggleDislike);

export default router;
