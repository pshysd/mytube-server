import { RequestHandler } from 'express';
import User from '../schemas/user';
import passport from 'passport';
import bcrypt from 'bcrypt';

export const getUser: RequestHandler = (req, res) => res.json(req.user || false);

export const logIn: RequestHandler = async (req, res, next) => {
	passport.authenticate('local', (unknownError: Error, user: Express.User, info: { message: string }) => {
		if (unknownError) {
			return next(unknownError);
		}
		if (info) {
			return res.status(401).send(info.message);
		}

		return req.login(user, async (loginError) => {
			if (loginError) {
				return next(loginError);
			}

			try {
				const _user = await User.findOne({ email: user.email });
				res.cookie('w_authExp', user.tokenExp).cookie('w_auth', user.token).json({ user: _user });
			} catch (e) {
				const err = e as Error;
				next(err);
			}
		});
	})(req, res, next);
};

export const logOut: RequestHandler = (req, res) => {
	req.logout(() => {
		res.send('ok');
	});
};

export const signUp: RequestHandler = async (req, res, next) => {
	try {
		const { email, name, password, image } = req.body;
		const exUser = await User.findOne({ email });
		if (exUser) return res.status(403).send('이미 가입된 이메일입니다.');

		const hashedPassword = await bcrypt.hash(password, 10);

		const user = await User.create({
			email,
			password: hashedPassword,
			name,
			image,
		});

		if (user) return res.status(201).send('ok');
	} catch (err) {
		next(err);
	}
};
