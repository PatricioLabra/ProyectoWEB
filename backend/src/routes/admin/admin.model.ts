import { Schema, Model, model } from "mongoose";

const adminSchema = new Schema({
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
  permission_level: {
      type: Number,
      required: true
  }
}, {
  versionKey: false,
  timestamps: true
});

export default model('Admin', adminSchema);
