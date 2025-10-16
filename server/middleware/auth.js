import User from "../modules/User";
import jwt from "jsonwebtoken"


export const processRoute = async(req, res, next) =>{
    try{
        const token = req.headers.token;
        const deCoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(deCoded.userId.select("-sUserPwd"));
        if(!user)
        {
            return res.json({success: false, message:"User Not Found"});
        }
        req.user = user;
    }
    catch(error)
    {
        console.log(error.message);
        res.json({success:false, message:error.message})
    }
}


