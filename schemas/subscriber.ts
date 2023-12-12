import mongoose from 'mongoose';
import type { User } from './user';

export type Subscriber = {
	userTo: string | User;
	userFrom: string | User;
};

const objectId = mongoose.Types.ObjectId;

const subscriberSchema = new mongoose.Schema(
	{
		userTo: {
			type: objectId,
			ref: 'User',
		},
		userFrom: {
			type: objectId,
			ref: 'User',
		},
	},
	{
		timestamps: true,
	}
);

export default mongoose.model('Subscriber', subscriberSchema);
