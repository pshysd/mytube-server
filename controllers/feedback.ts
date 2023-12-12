import { RequestHandler } from 'express';
import Like from '../schemas/like';
import Dislike from '../schemas/dislike';

export const getLikes: RequestHandler = async (req, res, next) => {
	type QueryString = {
		videoId?: string;
		commentId?: string;
	};
	const { videoId, commentId }: QueryString = req.query;
	const queryObj: { videoId?: string; commentId?: string } = {};

	if (videoId) {
		queryObj.videoId = videoId;
	} else {
		queryObj.commentId = commentId;
	}

	try {
		const likes = await Like.find(queryObj);
		return res.status(200).json(likes);
	} catch (e) {
		const err = e as Error;
		err.status = 400;
		err.message = '좋아요를 가져오는 도중에 에러 발생';
		next(err);
	}
};

export const getDislikes: RequestHandler = async (req, res, next) => {
	type QueryString = {
		videoId?: string;
		commentId?: string;
	};

	const { videoId, commentId }: QueryString = req.query;

	const queryObj: { videoId?: string; commentId?: string } = {};

	if (videoId) {
		queryObj.videoId = videoId;
	} else {
		queryObj.commentId = commentId;
	}

	try {
		const dislikes = await Dislike.find(queryObj);
		return res.status(200).json(dislikes);
	} catch (e) {
		const err = e as Error;
		err.status = 400;
		err.message = '싫어요를 가져오는 도중에 에러 발생';
		next(err);
	}
};

export const getLikeByUserId: RequestHandler = async (req, res, next) => {
	type QueryString = {
		videoId?: string;
		commentId?: string;
	};

	const { videoId, commentId }: QueryString = req.query;
	const { userId } = req.params;

	const queryObj: { videoId?: string; commentId?: string; userId: string } = {
		userId,
	};

	if (videoId) {
		queryObj.videoId = videoId;
	} else {
		queryObj.commentId = commentId;
	}

	try {
		const like = await Like.findOne(queryObj);
		return res.status(200).json(like);
	} catch (e) {
		const err = e as Error;
		err.status = 400;
		err.message = '유저 좋아요 정보를 가져오는 도중에 에러 발생';
		next(err);
	}
};

export const getDislikeByUserId: RequestHandler = async (req, res, next) => {
	type QueryString = {
		videoId?: string;
		commentId?: string;
	};

	const { videoId, commentId }: QueryString = req.query;
	const { userId } = req.params;

	const queryObj: { videoId?: string; commentId?: string; userId: string } = {
		userId,
	};

	if (videoId) {
		queryObj.videoId = videoId;
	} else {
		queryObj.commentId = commentId;
	}

	try {
		const like = await Dislike.findOne(queryObj);
		return res.status(200).json(like);
	} catch (e) {
		const err = e as Error;
		err.status = 400;
		err.message = '유저 싫어요 정보를 가져오는 도중에 에러 발생';
		next(err);
	}
};

export const toggleLike: RequestHandler = async (req, res, next) => {
	const { userId, commentId, videoId } = req.body;

	const queryObj: { userId: string; commentId?: string; videoId?: string } = {
		userId,
	};
	if (videoId) {
		queryObj.videoId = videoId;
	} else {
		queryObj.commentId = commentId;
	}

	try {
		const like = await Like.findOne(queryObj);

		if (like) {
			await Like.deleteOne({ _id: like._id });
			return res.status(200).send('down');
		} else {
			const isDisliked = await Dislike.findOne(queryObj);
			if (isDisliked) {
				// 삭제되는 것을 기다린 뒤에 Like를 만들어줄 필요는 없으므로 await 안씀
				return Dislike.deleteOne({ _id: isDisliked._id });
			}
			await Like.create(queryObj);
			return res.status(201).send('up');
		}
	} catch (e) {
		const err = e as Error;
		err.status = 400;
		err.message = '좋아요 처리 도중 에러 발생';
		next(err);
	}
};

export const toggleDislike: RequestHandler = async (req, res, next) => {
	const { userId, commentId, videoId } = req.body;

	const queryObj: { userId: string; commentId?: string; videoId?: string } = {
		userId,
	};
	if (videoId) {
		queryObj.videoId = videoId;
	} else {
		queryObj.commentId = commentId;
	}

	try {
		const dislike = await Dislike.findOne(queryObj);

		if (dislike) {
			await Dislike.deleteOne({ _id: dislike._id });
			return res.status(200).send('ok');
		} else {
			const isLiked = await Like.findOne(queryObj);
			if (isLiked) {
				return Like.deleteOne({ _id: isLiked._id });
			}
			await Dislike.create(queryObj);
			return res.status(201).send('ok');
		}
	} catch (e) {
		const err = e as Error;
		err.status = 400;
		err.message = '싫어요 처리 도중 에러 발생';
		next(err);
	}
};
