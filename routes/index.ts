import express from 'express';
import logger from '../logger';
import usersRouter from './users';
import videosRouter from './videos';
import subsRouter from './subs';
import commentsRouter from './comments';
import privacyRouter from './privacy';
import categoriesRouter from './categories';
import feedbacksRouter from './feedbacks';

/* ==================
    Routes: /api
================== */
const router = express.Router();

router.use('/users', usersRouter);
router.use('/videos', videosRouter);
router.use('/subs', subsRouter);
router.use('/comments', commentsRouter);
router.use('/privacy', privacyRouter);
router.use('/categories', categoriesRouter);
router.use('/feedbacks', feedbacksRouter);

export default router;
