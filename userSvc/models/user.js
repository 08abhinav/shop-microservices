import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
    username:{
        type: String,
        required: true
    },
    email:{
        type: String, 
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    role:{
        type: String,
        enum: ['buyer', 'seller'],
        required: true
    }
})

export const User = mongoose.model('User', UserSchema);