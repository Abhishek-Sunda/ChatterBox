// Sign Up New User

import { generateToken } from "../lib/utilis";

export const SignUp = async(req, res)=>{
    try{
         const {fullname, email, password, bio} = req.body;
        if(!fullName || !email || !password || !bio)
        {
            return res.json({success:false, Message: "Missing Details"})
        }
        const user = await User.FindOne({email});
        if(user)
        {
            return res.json({success:false, Message: "Account Already Exist"});
        }

        const salt = await bcrypt.genSalt(10);
        const sEncrytPwd = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            fullName , email, password:sEncrytPwd, bio
        });
        const token = generateToken(newUser._id)
        res.json({success:true, userData:newUser, token, message:"Account Has been Created Successfully"})
    }
    catch(error)
    {
        console.log(error.message);
        res.json({success:false, message:error.message})
    }
}

export const LoginIn = async(req, res)=>{
    try{
        const {email, password} = req.body;

        const userData = await User.FindOne({email});
        const bChkPwd   = await bcrypt.compare(password, userData.sUserPwd);
        if(!bChkPwd)
        {
            return res.jsom({success:false, message:"Invalid Credentails"});
        }
        const token = generateToken(newUser._id)
        res.json({success:true, userData, token, message:"Login Successfully..."})

    }
    catch(error)
    {
        console.log(error.message);
        res.json({success:false, message:error.message})
    }
}

//  To check id User Authenticated
export const CheckAuth = (req,res) =>
{
    res.json({success: false, user:"req.user"});
}

//  Update User Profile Details


