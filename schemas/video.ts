import mongoose from 'mongoose';
import type { User } from './user';
import type { Privacy } from './privacy';
import type { Category } from './category';

export type Video = {
	writer: string | User;
	title: string;
	description: string;
	privacy: string | Privacy;
	category: string | Category;
	filePath: string;
	views: number;
	duration: number;
	thumbnail: string;
};

const objectId = mongoose.Types.ObjectId;

const videoSchema = new mongoose.Schema<Video>(
	{
		// 게시자
		writer: {
			type: objectId,
			ref: 'User',
		},
		// 제목
		title: {
			type: String,
			maxlength: 50,
		},
		// 설명
		description: String,

		// 공개 범위
		privacy: {
			type: objectId,
			ref: 'Privacy',
		},

		// 카테고리
		category: {
			type: objectId,
			ref: 'Category',
		},

		// 영상 저장 주소
		filePath: String,

		// 조회수
		views: {
			type: Number,
			default: 0,
		},

		// 영상 길이
		duration: { type: Number },

		// 썸네일
		thumbnail: { type: String },
	},
	{
		timestamps: true,
	}
);

export default mongoose.model('Video', videoSchema);
