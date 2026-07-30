import bcrypt from "bcryptjs";
import {User} from "../models/user.js";
import { generateToken } from "../lib/generateToken.js";

export const userSignIn = async (req, res)=>{
    const {email, password} = req.body;
    try{
        if(!email || !password){
            return res.status(400).json({"error": "All fields are required"})
        }

        const user = await User.findOne({email});
        if(!user){
            return res.status(404).json({"error": "User not found"});
        }

        const isMatched = await bcrypt.compare(password, user.password);
        if(!isMatched){
            return res.status(404).json({"error": "Incorrect password"});
        }

        const token = generateToken(user);
        res.cookie("token", token, {httpOnly: true})

        return res.status(200).json({
            "msg": "Login successfully",
            token,
        })
    }catch(err){
        return res.status(500).json({"msg": "Something went worng", "error": err})
    }
}

export const userSignUp = async (req, res)=>{
    const{username, email, password, role} = req.body;
    try{
        if(!username || !email || !password || !role){
            return res.status(401).json({'error': "All fields are required"})
        }
        const isExist = await User.findOne({email})
        if(isExist){
           return res.status(400).json({'error': "User already exist"})
        }

        const salt = 10;
        const hashPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({username, email, password: hashPassword, role})

        return res.status(201).json({
            "msg": "User Created successfully",
            "user": newUser
        })
    }catch(err){
        return res.status(500).json({"msg": "Something went worng", "error": err})
    }   
}

export const userSignOut = async (req, res)=>{
    try{
        res.clearCookie("token");
        return res.status(200).json({"msg": "Sign out successfully"})
    }catch(err){
        return res.status(500).json({"msg": "Something went worng", "error": err})
    }
}