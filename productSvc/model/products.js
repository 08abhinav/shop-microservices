import mongoose from "mongoose";

const ProductSchema = mongoose.Schema({
    pname:{
        type: String,
        required: true,
        trim: true
    },
    description:{
        type: String,
        trim: true
    },
    price:{
        type: Number,
        required: true
    },
    model:{
        type: Number,
        required: true
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, {timestamps: true})

export const Product = mongoose.model("Product", ProductSchema);