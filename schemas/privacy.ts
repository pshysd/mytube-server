import mongoose from 'mongoose';

export type Privacy = {
	value: number;
	label: string;
};
const privacySchema = new mongoose.Schema<Privacy>({
	value: {
		type: Number,
	},
	label: {
		type: String,
	},
});

export default mongoose.model('Privacy', privacySchema, 'privacy');
