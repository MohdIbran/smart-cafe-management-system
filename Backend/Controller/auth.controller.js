const Jwt = require('jsonwebtoken');
const userModel = require('../models/user.model');


// /api/auth/register
async function register(req,res) {
    try {
        const {name,email,password} = req.body;
if(!name || !email || !password){
    return res.status(400).json({
        message : "name,email and password are required"
    })

}
const alreadyExist = await userModel.findOne({email})
if (alreadyExist) {
    return res.status(409).json({
        message:"the email is already exits",
    })
    
}
const userCount = await userModel.countDocuments();
const role = userCount === 0 ? "admin" : "staff";
const user = await userModel.create({
    name,
    email,
    password,
    role
})
const token = Jwt.sign({id: user._id,},
    process.env.JWT_CODE,{
        expiresIn : "7d",
    }
)

res.status(201).json({
    token: token,
    user : user.toSafeObject()

})

        
    } catch (error) {
console.log(error.stack);


        return res.status(500).json({
            message:"the registration failded",
            error : error.message,
        })
        
    }
    
    }
    ///api/auth/login
    async function login(req,res) {
        try {
            const {email,password} = req.body;
            if(!email || !password){
                return res.status(401).json({
                    message : "the email and password is not here",
                })

            }
            const decoded = await userModel.findOne({email})

            if(!decoded || !(await decoded.comparePassword(password))){
                return res.status(401).json({
                    message : "the user not login"
                })

            }
            
            const token = Jwt.sign({id : decoded._id},
                process.env.JWT_CODE,{
              expiresIn : "7d",
           }
           )

            res.json({token, decoded:decoded.toSafeObject()})





        } catch (error) {
            return res.status(500).json({
                message:"the login faild",
                error : error.message
            })
            
        }
        
    }
    ///get the imfomation 
    async function getme(req,res) {
        res.status(200).json({
            data : req.user.toSafeObject(),
        })
        
    }
    module.exports = {
        register,
        login,
        getme
    }