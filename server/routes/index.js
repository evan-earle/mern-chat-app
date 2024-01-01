import express from "express";
import authRoutes from "./auth.js";
import usersRoutes from "./users.js";
import chatRoutes from "./chat.js";
import messageRoutes from "./message.js";
import checkAuth from "../utils/checkAuth.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/users", checkAuth, usersRoutes);
router.use("/chat", checkAuth, chatRoutes);
router.use("/message", checkAuth, messageRoutes);

export default router;
