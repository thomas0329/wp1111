import mongoose, { Schema } from "mongoose";

const ChatBoxSchema = new Schema({
    name: {
      type: String,
      required:
      [true, 'Name field is required.']
    },
    messages: [{
      sender: { type: String },
      body  : { type: String }, }],
  });
const ChatBoxModel =
    mongoose.model('chatboxes',
    ChatBoxSchema);

export { ChatBoxModel as default };

