import express from "express";
import {
  getUserInfo,
  updateUser,
  upload,
  storePhoto,
  getPhoto,
  allUsers,
} from "../controllers/users.js";

const router = express.Router();

router.get("/", allUsers);
router.get("/me", getUserInfo);
router.put("/me", updateUser);
router.post("/upload", upload);
router.post("/storePhoto", storePhoto);
router.get("/getPhoto", getPhoto);

export default router;
