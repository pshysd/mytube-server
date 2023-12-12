/* IMPORTS */
import express, { ErrorRequestHandler } from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import mongoConnect from './schemas';
import path from 'path';
import fs from 'fs';
import passport from 'passport';
import passportConfig from './passport';
import morgan from 'morgan';
import logger from './logger';
import apiRouter from './routes';

dotenv.config();

/* APP */

const app = express();

mongoConnect();
passportConfig();

try {
	if (!fs.existsSync('uploads')) {
		console.log('uploads 폴더를 생성합니다.');
		fs.mkdirSync('uploads');
	}
} catch (error) {
	console.error('uploads 폴더 확인 중 에러 발생', error);
}

app.set('PORT', process.env.PORT || 3448);

if (process.env.NODE_ENV === 'production') {
	app.enable('trust proxy');
	app.use(morgan('combined'));
	app.use(
		helmet({
			contentSecurityPolicy: false,
			crossOriginEmbedderPolicy: false,
			crossOriginResourcePolicy: false,
		})
	);
	app.use(hpp());
} else {
	app.use(morgan('dev'));
}

app.use(
	cors({
		origin: '*',
		methods: 'GET, POST',
		credentials: true,
	})
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

const sessionOptions: session.SessionOptions = {
	resave: false,
	saveUninitialized: false,
	secret: process.env.COOKIE_SECRET!,
	cookie: {
		httpOnly: true,
		secure: false,
	},
};

if (process.env.NODE_ENV === 'production') {
	sessionOptions.proxy = true;
}

app.use(session(sessionOptions));

app.use(passport.initialize());
app.use(passport.session());

// 서버로 그냥 접속 시도할 경우
app.get('/', (req, res, next) => {
	res.sendFile(path.join(__dirname, '../client', 'index.html'));
});

// CLIENT에서 보내는 API 요청
app.use('/api', apiRouter);

// 비디오같은 파일이 저장되는 실제 위치
app.use('/uploads', express.static('uploads'));

if (process.env.NODE_ENV === 'production') {
	app.use(express.static('client/build'));
}

app.use((req, res, next) => {
	const err = new Error(`${req.method} ${req.url} 요청은 유효하지 않습니다.`);
	logger.error(err.message);
	err.status = 404;
	next(err);
});

const errRequestHandler: ErrorRequestHandler = (err, req, res, next) => {
	res.locals.message = err.message;
	res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
	res.status(err.status || 500).json(err);
};

app.use(errRequestHandler);

export default app;
