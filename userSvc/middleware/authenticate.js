import "dotenv/config";

export function authenticate(){
    return (req, res, next)=>{
        const cookieValue = req.cookies?.token;
        if(!cookieValue){
            return res.status(401).json({"error": "unauthorized user", "msg": "Please signin or signup"})
        }
        try{
            const payload = jwt.verify(cookieValue, process.env.JWT_SECRET);
            req.user = payload;
            return next();
        }catch(err){
            return res.status(500).json({"msg": "something went wrong"});
        }
    }
}