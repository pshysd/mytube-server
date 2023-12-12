import mongoose from 'mongoose';
import { User } from './user';
import { Video } from './video';

export type Comment = {
	_id: string;
	writer: string | User;
	videoId: string | Video;
	responseTo: string | User;
	content: string;
};

const objectId = mongoose.Types.ObjectId;

const commentSchema = new mongoose.Schema<Comment>(
	{
		// 댓글 작성자
		writer: {
			type: objectId,
			ref: 'User',
			required: true,
		},

		// 댓글을 작성한 동영상
		videoId: {
			type: objectId,
			ref: 'Video',
			required: true,
		},

		// 대댓글을 작성할 원본 댓글
		responseTo: {
			type: objectId,
			ref: 'User',
		},

		// 댓글 내용
		content: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

export default mongoose.model('Comment', commentSchema);
