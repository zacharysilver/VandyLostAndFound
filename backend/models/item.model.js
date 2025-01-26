import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    dateFound: {
        type: Date,
        required: true,
    },
    description: {
        type: String,
        required: true
    }
}, {timestamps: true});


const Item = mongoose.model("Item", itemSchema);

export default Item;