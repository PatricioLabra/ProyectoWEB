import { Schema, Model, model } from "mongoose";
import Dimension from './dimension.model'

const productSchema = new Schema({
	name: {
    type: String,
    trim: true,
    required: true
  },
  trademark: {
    type: String,
    trim: true,
    required: true
  },
  images_urls: {
    type: String,
    required: true
  },
  price:{
      type: Number,
      required: true
  },
  discount:Number,
  description: String,
  weight: Number,
  dimensions: Dimension,
  stock: Number,
  calification: Number,
  category: String,
  subcategories: String,
}, {
  versionKey: false,
  timestamps: true
});

export default model('Product', productSchema);
