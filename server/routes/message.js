import express from "express";
import { sendMessage, allMessages } from "../controllers/message.js";

const router = express.Router();

router.post("/", sendMessage);
router.get("/:chatId", allMessages);

export default router;
