import  express from "express";
import "dotenv/config";

import cors from "cors";
import http from "http";
import { connectDB } from "./lib/db.js";
import userRouter from "./routes/UserRoutes.js";
import messageRouter from "./routes/messageRoute.js";
import { Server } from "socket.io";



// express app and http server
const app = express()
const server = http.createServer(app);

// Initailize Socket.io server


export const io = new Server(server, {
    cors: {
        origin: "*"
    }
});

// Store online Users
export const userSocketMap = {}; //{userId:socketId}
 
// socket.io connection handler
io.on("connection", (socket) => {
    const userId = socket.handshake.query.userId;
    console.log("user connected", userId);
 
    

    if (userId) userSocketMap[userId] = socket.id;

    // emit online users to all connected clients
    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    socket.on("disconnect", ()=>{
        console.log("user Disconnected", userId);
        delete userSocketMap[userId];
        io.emit("getOnlineUsers", Object.keys(userSocketMap))
    })
})

// Middleware Setup
app.use(express.json({limit:"4mb"}));
app.use(cors());

// Routes
app.use("/api/status", (req, res)=>{res.send("Server is Live")})
app.use("/api/auth", userRouter); // Route Setup
app.use("/api/messages", messageRouter);


// connect to MongoDB
await connectDB(); 
const PORT = process.env.PORT || 5000;
server.listen(PORT, ()=>console.log("Server is Running on Port : "+ PORT));