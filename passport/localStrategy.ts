import passport from 'passport';
import { Strategy } from 'passport-local';
import bcrypt from 'bcrypt';
import User from '../schemas/user';
import jwt from 'jsonwebtoken';
import moment from 'moment';

export default () => {
	passport.use(
		new Strategy(
			{
				usernameField: 'email',
				passwordField: 'password',
				session: true,
			},
			async (email, password, done) => {
				try {
					const user = await User.findOne({ email });
					if (user) {
						const result = await bcrypt.compare(password, user.password);
						if (result) {
							const token = jwt.sign(user._id.toString(), 'secret');
							const oneHour = moment().add(1, 'hour').valueOf();
							user
								.updateOne({ token, tokenExp: oneHour })
								.then(() => {
									done(null, user);
								})
								.catch((err: Error) => {
									done(err);
								});
						} else {
							done(null, false, { message: '비밀번호가 일치하지 않습니다.' });
						}
					} else {
						done(null, false, { message: '존재하지 않는 이메일입니다.' });
					}
				} catch (error) {
					done(error);
				}
			}
		)
	);
};
