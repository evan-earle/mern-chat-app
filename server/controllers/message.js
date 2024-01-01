import Message from "../models/Message.js";
import User from "../models/User.js";
import Chat from "../models/Chat.js";

export const sendMessage = async (req, res, next) => {
  const { content, chatId } = req.body;

  if (!content || !chatId) {
    console.log("Invalid data passed into request");
    return res.status(400);
  }

  let newMessage = {
    sender: req.user.id,
    content: content,
    chat: chatId,
  };

  try {
    let message = await Message.create(newMessage);

    message = await message.populate("sender", "name image");
    message = await message.populate("chat");
    message = await User.populate(message, {
      path: "chat.users",
      select: "name image email",
    });

    await Chat.findByIdAndUpdate(req.body.chatId, {
      latestMessage: message,
    });

    return res.status(200).json(message);
  } catch (err) {
    return next(err);
  }
};

export const allMessages = async (req, res, next) => {
  try {
    const messages = await Message.find({ chat: req.params.chatId })
      .populate("sender", "name image email")
      .populate("chat");

    return res.status(200).json(messages);
  } catch (err) {
    return next(err);
  }
};
