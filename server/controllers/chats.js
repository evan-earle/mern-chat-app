import Chat from "../models/Chat.js";
import User from "../models/User.js";

export const accessChat = async (req, res, next) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      console.log("UserId param not sent");
      return res.status(400);
    }

    let isChat = await Chat.find({
      isGroupChat: false,
      $and: [
        { users: { $elemMatch: { $eq: req.user.id } } },
        { users: { $elemMatch: { $eq: userId } } },
      ],
    })
      .populate("users", "-password")
      .populate("latestMessage");

    isChat = await User.populate(isChat, {
      path: "latestMessage.sender",
      select: "name image email",
    });

    if (isChat.length > 0) {
      res.send(isChat[0]);
    } else {
      let chatData = {
        chatName: "sender",
        isGroupChat: false,
        users: [req.user.id, userId],
      };

      try {
        const createdChat = await Chat.create(chatData);

        const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
          "users",
          "-password"
        );
        return res.status(200).json(FullChat);
      } catch (error) {
        return next(err);
      }
    }
  } catch (err) {
    return next(err);
  }
};

export const fetchChats = async (req, res, next) => {
  try {
    Chat.find({ users: { $elemMatch: { $eq: req.user.id } } })
      .populate("users", "-password")
      .populate("groupAdmin", "-password")
      .populate("latestMessage")
      .sort({ updatedAt: -1 })
      .then(async (results) => {
        results = await User.populate(results, {
          path: "latestMessage.sender",
          select: "name image email",
        });
        return res.status(200).json(results);
      });
  } catch (err) {
    return next(err);
  }
};

export const createGroupChat = async (req, res, next) => {
  if (!req.body.users || !req.body.name) {
    return res.status(400).send({ message: "Please Fill all the feilds" });
  }

  var users = req.body.users;

  if (users.length < 2) {
    return res
      .status(400)
      .send("More than 2 users are required to form a group chat");
  }

  users.push(req.user.id);

  try {
    const groupChat = await Chat.create({
      chatName: req.body.name,
      users: users,
      isGroupChat: true,
      groupAdmin: req.user.id,
    });

    const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    res.status(200).json(fullGroupChat);
  } catch (err) {
    return next(err);
  }
};
