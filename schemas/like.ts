import mongoose from 'mongoose';

import type { User } from './user';
import type { Video } from './video';
import type { Comment } from './comment';

export type Like = {
	userId: string | User;
	commentId?: string | Comment;
	videoId?: string | Video;
};

const objectId = mongoose.Types.ObjectId;

const likeSchema = new mongoose.Schema<Like>(
	{
		userId: {
			type: objectId,
			ref: 'User',
		},
		commentId: {
			type: objectId,
			ref: 'Comment',
		},
		videoId: {
			type: objectId,
			ref: 'Video',
		},
	},
	{
		timestamps: true,
	}
);

export default mongoose.model('Like', likeSchema);
