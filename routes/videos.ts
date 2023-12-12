import express from 'express';
import { createThumbnail, getVideos, uploadVideo, getVideo, getSubscriptionVideos, uploadFile } from '../controllers/video';
import { isLoggedIn } from '../middlewares';
/* ======================
		Route: /api/videos
====================== */

const router = express.Router();

// 비디오 전체 가져옴
router.get('/', getVideos);

// 해당 비디오만 가져옴
router.get('/:videoId', getVideo);

// 유저가 구독한 비디오만 가져옴
router.get('/subs/:userId', isLoggedIn, getSubscriptionVideos);

// DB에 경로 저장
router.post('/', isLoggedIn, uploadVideo);

// 실제 파일 저장
router.post('/file', isLoggedIn, uploadFile);

// 썸네일 저장하기
router.post('/thumbnail', isLoggedIn, createThumbnail);

export default router;
