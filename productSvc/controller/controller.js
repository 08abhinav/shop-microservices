import {Product} from "../model/products.js"

export const handleCreation = async (req, res)=>{
    const {pname, description, price, model } = req.body;
    try{
        if (!pname || !price || !model){
            return res.status(400).json({"msg": "All fields are required"});
        }
        const product = await Product.create({pname, description, price, model, user: req.user._id})
        
        return res.status(201).json({"msg": "Product created successfully", product})
    }catch(err){
        return res.status(500).json({"msg": "Internal server error", "error": err})
    }
}

export const handleRead = async (req, res)=>{
    try{
        const product = await Product.find({})
        return res.status(200).json({"status": "success", product})

    }catch(err){
        return res.status(500).json({"msg": "Internal server error", "error": err})
    }
}

export const getUserProducts = async (req, res)=>{
    try{
        const userId = req.user._id;
        if(!userId){
            return res.status(401).json({"msg": "Unauthorized user"})
        }

        const product = await Product.find({user: userId});
        if(!product){
            return res.status(404).json({"msg": "Not product found"})
        }

        return res.status(200).json({"status": "success", product})
    }catch(err){
        return res.status(500).json({"msg": "Internal server error", "error": err})
    }
}

export const handleDeletion = async (req, res)=>{
    try{
        const {id} = req.params
        
        const product = await Product.findOneAndDelete(
            {
                _id: id, user: req.user._id
            }
        );

        if (!product) {
            return res.status(404).json({
                message: "Product not found or you are not authorized."
            });
        }

        return res.status(200).json({message: "Product deleted successfully"});
    }catch(err){
        return res.status(500).json({"msg": "Internal server error", "error": err})
    }
}

export const handleUpdation = async (req, res)=>{
    try{
        const {id} = req.params
        const { pname, description, price, model } = req.body;

        const updatedProduct = await Product.findOneAndUpdate(
            {
                _id: id, user: req.user._id
            },
            {
                pname,
                description,
                price,
                model
            },
            {
                new: true,
                runValidators: true
            }
        );

        if (!updatedProduct) {
            return res.status(404).json({
                message: "Product not found or you are not authorized."
            });
        }

        return res.status(200).json({message: "Product updated successfully", updatedProduct});
    }catch(err){
        return res.status(500).json({"msg": "Internal server error", "error": err})
    }
}