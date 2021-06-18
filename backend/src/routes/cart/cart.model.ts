import { Schema, model} from "mongoose";

const cartSchema = new Schema({

    nickname_buyer: {
        type: String,
        trim: true,
        required: true
    },
    products:Schema.Types.Mixed
},{ 
versionKey: false,
timestamps: true 
});

export default model('Cart', cartSchema);
