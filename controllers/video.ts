import { RequestHandler } from 'express';
import ffmpeg from 'fluent-ffmpeg';
import { upload } from '../middlewares';
import { Video, Subscribe } from '../schemas';

export const uploadFile: RequestHandler = (req, res) => {
	upload.single('file')(req, res, (err) => {
		if (err) return res.json(err);
		return res.json({ filePath: res.req.file?.path, fileName: res.req.file?.filename });
	});
};

export const createThumbnail: RequestHandler = async (req, res, next) => {
	const { filePath, fileName } = req.body;
	let thumbnailFilePath: string = '';
	let fileDuration: number | undefined = 0;

	// 비디오 메타데이터 읽기
	await ffmpeg.ffprobe(filePath, (err, metadata) => {
		fileDuration = metadata.format?.duration;
	});

	await ffmpeg(filePath)
		.on('filenames', (filenames) => {
			thumbnailFilePath = `uploads/thumbnails/${filenames[0]}`;
		})
		.on('end', () => {
			return res.json({ thumbnailFilePath, fileDuration });
		})
		.screenshots({
			count: 3,
			folder: 'uploads/thumbnails',
			size: '320x240',
			filename: 'thumbnail-%b.png',
		});
};

export const uploadVideo: RequestHandler = async (req, res, next) => {
	try {
		const result = await Video.create(req.body);
		if (result) return res.send('ok');
	} catch (error) {
		const err = error as Error;
		err.status = 400;
		next(err);
	}
};

// 전체 비디오 가져오기
export const getVideos: RequestHandler = async (req, res, next) => {
	try {
		const videos = await Video.find().populate('writer');

		if (videos) res.json(videos);
	} catch (error) {
		const err = error as Error;
		err.status = 400;
		next(err);
	}
};

// 쿼리파라미터로 특정 비디오 가져오기
export const getVideo: RequestHandler = async (req, res, next) => {
	try {
		const video = await Video.findOne({ _id: req.params.videoId }).populate('writer');
		if (video) res.json(video);
	} catch (error) {
		const err = error as Error;
		err.status = 400;
		next(err);
	}
};

export const getSubscriptionVideos: RequestHandler = async (req, res, next) => {
	const userId = req.params.userId;
	try {
		const result = await Subscribe.find({ userFrom: userId });
		if (result) {
			const subscribedUsers = result.map((subscriber) => subscriber.userTo);

			const videos = await Video.find({ writer: { $in: subscribedUsers } }).populate('writer');
			if (videos) res.json(videos);
		}
	} catch (error) {
		const err = error as Error;
		err.status = 400;
		next(err);
	}
};
