import { Schema, model } from "mongoose";

const commentSchema = new Schema({
	id_product: {
    type: String,
    required: true
  },
  comments: [Schema.Types.Mixed]
}, {
  versionKey: false,
  timestamps: true
});

export default model('Comment', commentSchema);
