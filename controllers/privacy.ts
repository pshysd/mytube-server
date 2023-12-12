import { RequestHandler } from 'express';
import Privacy from '../schemas/privacy';

const getPrivacy: RequestHandler = async (req, res, next) => {
	try {
		const privacy = await Privacy.find();

		return res.status(200).json(privacy);
	} catch (e) {
		const err = e as Error;
		err.status = 200;
		err.message = '공개 범위 설정 정보를 가져오는 도중에 문제가 발생했습니다.';
		next(err);
	}
};

export { getPrivacy };
