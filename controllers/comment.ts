import { RequestHandler } from 'express';
import Comment from '../schemas/comment';

// 댓글 가져오기
export const getComments: RequestHandler = async (req, res, next) => {
	const { videoId } = req.params;
	try {
		const comments = await Comment.find({ videoId: videoId }).populate('writer');
		return res.status(200).json(comments);
	} catch (e) {
		const err = e as Error;
		err.status = 400;
		next(err);
	}
};

// 댓글 작성하기
export const createComment: RequestHandler = async (req, res, next) => {
	const { content, writer, videoId } = req.body;
	try {
		await Comment.create({ writer: writer._id, content, videoId });
		res.status(201).send('ok');
	} catch (e) {
		const err = e as Error;
		err.status = 400;
		err.message = '댓글을 등록하는 중에 에러가 발생함';
		next(err);
	}
};
