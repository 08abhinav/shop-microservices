import jwt from "jsonwebtoken"

export function generateToken(user){
    try{
        const payload = {
            _id: user._id,
            email: user.email,
            role: user.role
        }
        
        const token = jwt.sign(payload, process.env.JWT_SECRET)
        return token;
    }catch(err){
        console.log(`Something went wrong while generate token ${err}`);
    }
}