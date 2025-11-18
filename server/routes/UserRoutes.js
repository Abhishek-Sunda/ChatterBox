import express from "express";
import { CheckAuth, LoginIn, SignUp, updateProfile } from "../controllers/userController";
import { protectRoute } from "../middleware/auth";
const userRouter = express.Router();

userRouter.post("/signup", SignUp);
userRouter.post("/login", LoginIn);
userRouter.put("/updateprofile", protectRoute, updateProfile);
userRouter.get("/check", protectRoute, CheckAuth);

export default userRouter;