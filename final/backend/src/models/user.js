import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({
	name: String,
	email: String,
	password: String
});
const UserModel =
    mongoose.model('User',
    UserSchema);

export { UserModel as default };