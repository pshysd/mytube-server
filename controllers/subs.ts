import { RequestHandler } from 'express';
import Subscriber from '../schemas/subscriber';

// 구독 / 구독 취소
export const toggleSubs: RequestHandler = async (req, res, next) => {
	const { userTo, userFrom } = req.body;

	try {
		const subsInfo = await Subscriber.findOne({ userTo, userFrom });

		if (subsInfo) {
			await Subscriber.deleteOne({ _id: subsInfo._id });
			return res.status(200).send('ok');
		} else {
			await Subscriber.create({ userTo, userFrom });
			return res.status(201).send('ok');
		}
	} catch (e) {
		const err = e as Error;
		err.status = 400;
		err.message = '구독 처리 도중 에러 발생';
	}
};

// 구독자 수
export const countSubs: RequestHandler = async (req, res, next) => {
	const { userTo } = req.query;

	const subscribers = await Subscriber.find({ userTo });
	try {
		res.json(subscribers.length);
	} catch (e) {
		const err = e as Error;
		next(err);
	}
};

// 구독 여부
export const isSubs: RequestHandler = async (req, res, next) => {
	const { userTo, userFrom } = req.params;
	try {
		const subsInfo = await Subscriber.findOne({ userTo, userFrom });
		return subsInfo ? res.send(true) : res.send(false);
	} catch (e) {
		const err = e as Error;
		next(err);
	}
};
