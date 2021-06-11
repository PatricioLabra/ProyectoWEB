import { Schema, Model, model } from "mongoose";

const userSchema = new Schema({
	nickname: {
    type: String,
    trim: true,
    required: true
  },
  password: {
    type: String,
    trim: true,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  names: String,
  last_name: String,
  rut: {
    type: String,
    trim: true,
    required: true
  },
  region: String,
  commune: String,
  address: String
}, {
  versionKey: false,
  timestamps: true
});

export default model('User', userSchema);
