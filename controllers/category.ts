import { RequestHandler } from 'express';
import Category from '../schemas/category';

export const getCategories: RequestHandler = async (req, res, next) => {
	try {
		const categories = await Category.find();
		if (categories) return res.status(200).json(categories);
	} catch (e) {
		const err = e as Error;
		err.status = 400;
		err.message = '카테고리를 가져오는 도중 오류가 발생했습니다.';
		next(err);
	}
};
