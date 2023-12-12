import { RequestHandler } from 'express';
import multer from 'multer';
import sanitizeHtml from 'sanitize-html';

const isLoggedIn: RequestHandler = (req, res, next) => {
	if (req.isAuthenticated()) {
		next();
	} else {
		res.status(401).send('로그인한 사용자만 이용 가능한 서비스입니다.');
	}
};

const isNotLoggedIn: RequestHandler = (req, res, next) => {
	if (!req.isAuthenticated()) {
		next();
	} else {
		res.status(401).send('로그인하지 않은 사용자만 이용 가능한 서비스입니다.');
	}
};

const storage = multer.diskStorage({
	destination(req, file, callback) {
		callback(null, 'uploads/');
	},
	filename(req, file, callback) {
		callback(null, `${Date.now()}_${file.originalname}`);
	},
});

const upload = multer({ storage });

const sanitizer: RequestHandler = (req, res, next) => {
	const filtered = sanitizeHtml(req.body.content);
};
export { isLoggedIn, isNotLoggedIn, upload };
