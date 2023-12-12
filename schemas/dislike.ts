import mongoose from 'mongoose';
import type { User } from './user';
import type { Comment } from './comment';
import type { Video } from './video';

const objectId = mongoose.Types.ObjectId;

export type Dislike = {
	userId: string | User;
	commentId: string | Comment;
	videoId: string | Video;
};

const dislikeSchema = new mongoose.Schema<Dislike>(
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

export default mongoose.model('Dislike', dislikeSchema);
