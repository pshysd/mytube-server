import mongoose from 'mongoose';

export type Category = {
	value: number;
	label: string;
};

const categorySchema = new mongoose.Schema<Category>({
	value: {
		type: Number,
	},
	label: {
		type: String,
	},
});

export default mongoose.model('Category', categorySchema);
