import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Comment from './comment';
import Dislike from './dislike';
import Like from './like';
import Subscribe from './subscriber';
import User from './user';
import Video from './video';

dotenv.config();

const connect = () => {
	// 배포 모드가 아닐 경우엔 디버깅 로그 출력
	if (process.env.NODE_ENV !== 'production') {
		mongoose.set('debug', true);
	}

	/**
	 * mongoose와 mongoDB를 연결함.
	 */
	mongoose
		.connect(process.env.mongoURI!, {
			dbName: 'mytube',
		})
		.then(() => {
			console.log('mongoDB Connected');
		})
		.catch((error) => {
			console.error(error);
		});
};

// 에러 발생 시 에러 출력
mongoose.connection.on('error', (error) => {
	console.error(error);
});

// 연결이 끊겼을 시에 재 연결 시도
mongoose.connection.on('disconnected', () => {
	console.error('mongoDB disconnected, connecting again,,');
	connect();
});

export { Comment, Dislike, Like, Subscribe, User, Video };

export default connect;
