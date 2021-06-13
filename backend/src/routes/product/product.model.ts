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
    type: Array(),
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
    type : Array(),
    required: true
  }
}, {
  versionKey: false,
  timestamps: true
});

export default model('Product', productSchema);
