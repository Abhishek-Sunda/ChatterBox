import express from "express";
import { protectRoute } from "../middleware/auth";
import { getMessages, getUsersForSidebar, markMessageAsSeen } from "../controllers/messageController";
const messageRouter = express.Router();

messageRouter.get("/users", protectRoute, getUsersForSidebar);
messageRouter.get("/:id", protectRoute, getMessages);
messageRouter.get("mark/:id", protectRoute, markMessageAsSeen );

