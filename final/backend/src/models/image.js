// modified from https://github.com/thisissahulhameed/yt_image_backend/blob/master/models.js
import mongoose, { Schema } from "mongoose";

const ImageSchema = new Schema({
  name: String,
  img: Buffer,
});

const ImageModel =
  mongoose.model('Image',
  ImageSchema);

export { ImageModel as default };
