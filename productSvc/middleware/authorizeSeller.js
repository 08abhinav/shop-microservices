export function authorizeSeller(){
    return (req, res, next)=>{
        const role = req.headers["x-user-role"];
        if(role !== "seller"){
            return res.status(404).json({msg: "unauthorized or you are not a seller"})
        }
        next();
    }
}