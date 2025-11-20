
import mongoose, { mongo, Mongoose } from "mongoose";


const userSchema = new mongoose.Schema({
    sEmailId   : {type : String, required : true, unique : true},
    sFullName  : {type : String, required : true, unique : true},
    sUserPwd   : {type : String, required : true, minlength : 6},
    sPrflePic  : {type : String, default  : ""},
    sUserBio   : {type : String, default  : ""},
}, {timestamps:true});

const User = mongoose.model("User" , userSchema);
export default User;