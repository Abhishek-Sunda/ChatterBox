

// Get All User Message Exept the logged in User


import Message from '../models/Message.js';
import cloudinary from "../lib/cloudinary.js";
import { io, userSocketMap } from "../server.js";
export const getUsersForSidebar  = async ()=>{
    try
    {
        const userId = req.user._id;
        const filteredUser = await User.find({_id :{$ne :userId}}).select("-password");

        // count of unseen Message
        const unseenMessages = {}
        const promises       = filteredUser.map(async(user)=>{
            const message   = await Message.find({senderId:user._id, receiverId:userId, seen:false});
            if(message.length > 0)
            {
                unseenMessages[user._id] = message.length;
        }
    });
        await Promise.all(promises);
        
        res.json({success: true, user:"req.user"});
    
    }
    catch(error)
    {
        console.log(error.message);
    
        res.json({success: false, message:error.message});
    }
}

// Get All Message for Selected User
export const getMessages = async(req, res)=>{
    try {
        const {id:selectedUserId} = req.params;
        const myId = req.user._id;
        const messages = await Message.find({$or:[
            {senderId : myId, receiverId:selectedUserId},
                {senderId : selectedUserId, receiverId:myId}
        
        ]})
        await Message.updateMany({senderId:selectedUserId, receiverId:myId}, {seen:true})

        res.json({success: true, messages});
    } catch (error) {
           
        console.log(error.message);
        res.json({success: false, message:error.message});
    }
}

//api to mark message as seen using message id
export const markMessageAsSeen = async(req, res)=>{
     try {
        const {id} = req.params;
        await Message.findByIdAndUpdate(id, {seen:true});

        res.json({success: true});
    } catch (error) {
           
        console.log(error.message);
        res.json({success: false, message:error.message});
    }
}

// send message to user
export const sendmessage = async(req, res)=>{
     try {
        const {text, image} = req.body;
        const receiverId     = req.params.id;
        const senderId       = req.user._id;
        let  imagesUrl;
        if(image)
        {
            const uploadRespnse = await cloudinary.uploader.upload(image);
            imagesUrl           = uploadRespnse.secure_url;

        }
        const newMessage        = await Message.create({
            senderId, 
            receiverId,
            text, 
            image:imagesUrl
        })
        const receiverScoketId = userSocketMap[receiverId];
        if(receiverScoketId)
        {
            io.to(receiverScoketId).emit("new Message", newMessage);
        }
        res.json({success: true, newMessage});
    } catch (error) {
           
        console.log(error.message);
        res.json({success: false, message:error.message});
    }
}