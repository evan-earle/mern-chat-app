import User from "../models/User.js";
import bcryptjs from "bcryptjs";
import createError from "../utils/createError.js";
import { v2 as cloudinary } from "cloudinary";

export const getUserInfo = async (req, res, next) => {
  try {
    const data = await User.findById(req.user.id);
    return res.status(200).json(data);
  } catch (err) {
    return next(err);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });

    if (user) {
      return next(createError({ status: 401, message: "User already exists" }));
    }
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(req.body.password, salt);

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      {
        username: req.body.username,
        password: hashedPassword,
      },
      {
        new: true,
      }
    ).select("username password");

    return res.status(200).json(updatedUser);
  } catch (err) {
    return next(err);
  }
};

export const upload = async (req, res, next) => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  try {
    const fileStr = req.body.data;
    const uploadedResponse = await cloudinary.uploader.upload(fileStr, {
      upload_preset: "chat-app",
    });
    console.log(uploadedResponse);
    return res.status(200).json(uploadedResponse);
  } catch (err) {
    return next(err);
  }
};

export const storePhoto = async (req, res, next) => {
  try {
    const data = await User.findByIdAndUpdate(req.user.id, {
      image: req.body.photo,
    }).select("image");
    return res.status(200).json(data);
  } catch (err) {
    return next(err);
  }
};

export const getPhoto = async (req, res, next) => {
  try {
    const data = await User.findById(req.user.id, {}).select("image");
    return res.status(200).json(data);
  } catch (err) {
    return next(err);
  }
};

export const allUsers = async (req, res, next) => {
  try {
    const keyword = req.query.search
      ? {
          $or: [
            { name: { $regex: req.query.search, $options: "i" } },
            { email: { $regex: req.query.search, $options: "i" } },
          ],
        }
      : {};

    const data = await User.find(keyword).find({
      _id: { $ne: req.user.id },
    });

    return res.status(200).json(data);
  } catch (err) {
    return next(err);
  }
};
