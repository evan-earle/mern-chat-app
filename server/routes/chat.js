import express from "express";
import {
  accessChat,
  fetchChats,
  createGroupChat,
} from "../controllers/chats.js";

const router = express.Router();

router.post("/", accessChat);
router.get("/", fetchChats);
router.post("/group", createGroupChat);
// router.put("/rename", renameGroup);
// router.put("/groupremove", removeFromGroup);
// router.put("/groupadd", addToGroup);

export default router;
