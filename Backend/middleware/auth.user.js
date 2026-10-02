const userModel = require('../models/user.model')
const Jwt = require('jsonwebtoken')
const protect = async (req,res,next)=> {
      console.log("PROTECT HIT");
try {
        const authHeader = req.headers.authorization;
        if(!authHeader || !authHeader.startsWith("Bearer ")){
            return res.status(401).json({
                message : "Not Authorizes no token provided",
            })

        }
        const  token = authHeader.split(" ")[1];
        const decoded = Jwt.verify(token,process.env.JWT_CODE);
        const user = await userModel.findById(decoded.id).select("-password")
        if(!user){
            return res.status(401).json({
                message:"User no longer exits",
            })

        }
        req.user = user;
        next()
        
    } catch (error) {
        res.status(401).json({
            message : "Not authorized"
        })
        
    }
    
}
const Onlyadmin = (req,res,next)=>{
     console.log("ONLYADMIN HIT");
    if(req.user && req.user.role === 'admin'){
        return next();
        

    }
    return res.status(403).json({
        message : "Admin access required",
    })
}
module.exports = {
    protect,
    Onlyadmin,
}