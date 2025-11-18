import User from "../modules/User.js";
import jwt from "jsonwebtoken"


export const protectRoute = async(req, res, next) =>{
    try
    {
        const token     = req.headers.token;
        const deCodedId = jwt.verify(token, process.env.JWT_SECRET);
        const user       = await User.findById(deCodedId.userId.select("-sUserPwd"));
        if(!user)
        {
            return res.json({success: false, message:"User Not Found"});
        }
        req.user = user;
        next();
    }
    catch(error)
    {
        console.log(error.message);
        res.json({success:false, message:error.message})
    }
}

