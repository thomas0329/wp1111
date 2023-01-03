import mongoose, { Schema } from "mongoose";

const FigSchema = new Schema({
	name: String,
	email: String,
	picture: Array,
	trPicture: Array,
	block: String,
});

const FigModel =
    mongoose.model('User',
    FigSchema);

export { FigModel as default }