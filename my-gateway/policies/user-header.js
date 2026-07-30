module.exports = ()=>(req, res, next)=>{
    const user = req.user;
     if (!user) {
        return res.status(401).json({
            message: "Unauthorized"
        });
    }
    req.headers['x-user-id'] = user._id;
    req.headers['x-user-email'] = user.email;
    req.headers['x-user-role'] = user.role;
    next();
}
