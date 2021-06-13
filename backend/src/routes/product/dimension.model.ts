import { Schema, Model, model } from "mongoose";

const dimensionSchema = new Schema({
    height: Number,
    width: Number,
    length: Number
});

export default model('Dimension', dimensionSchema);
