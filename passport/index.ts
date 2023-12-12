import local from './localStrategy';
import passport from 'passport';
import User from '../schemas/user';

export default () => {
	passport.serializeUser((user, done) => {
		done(null, user._id);
	});

	passport.deserializeUser((_id: string, done) => {
		User.findById({ _id })
			.then((user) => {
				done(null, user);
			})
			.catch((err) => {
				done(err);
			});
	});
	local();
};
