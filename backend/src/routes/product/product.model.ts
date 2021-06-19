import { Schema, model } from "mongoose";

const productSchema = new Schema({
	name: {
    type: String,
    trim: true,
    required: true
  },
  trademark: String,
  images_urls: [String],
  price: {
      type: Number,
      required: true
  },
  discount: Number,
  description: String,
  weight: Number,
  dimensions: Schema.Types.Mixed,
  stock: {
    type : Number,
    required: true
  },
  calification: Number,
  category: {
    type : String,
    required: true
  },
  subcategories: {
    type : [String],
    required: true
  }
}, {
  versionKey: false,
  timestamps: true
});

export default model('Product', productSchema);
