import mongoose from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';

export type User = {
	_id: string;
	name: string;
	email: string;
	password: string;
	role: number;
	image: string;
	token: string;
	tokenExp: number;
	// findByToken: (token: string, cb: Callback) => void;
};

const userSchema = new mongoose.Schema<User>({
	name: {
		type: String,
		maxlength: 50,
		trim: true,
	},
	email: {
		type: String,
		trim: true,
		unique: true,
		required: true,
	},
	password: {
		type: String,
		minglength: 5,
		trim: true,
		required: true,
	},
	role: {
		type: Number,
		default: 0,
	},
	image: String,
	token: {
		type: String,
	},
	tokenExp: {
		type: Number,
	},
});

userSchema.plugin(passportLocalMongoose, {
	usernameField: 'email',
	passwordField: 'password',
});

export default mongoose.model('User', userSchema);
