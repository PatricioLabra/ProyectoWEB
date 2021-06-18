import { Schema, model } from "mongoose";

const commentSchema = new Schema({
	id_product: {
        type: String,
        required: true
    },
    comments: [{
        comment_body: String,
        nickname_autor: String,
        calification_author: Number,
        timestamps:true
    }]  
}, {
  versionKey: false,
  timestamps: true
});

export default model('Comment', commentSchema);
