const asyncHandler = require("express-async-handler");
const Message = require("../models/messageModel");
const User = require("../models/userModel");
const Chat = require("../models/chatModel");
const Report = require("../models/reportModel").reports;

//@description     Get all Messages
//@route           GET /api/Message/:chatId
//@access          Protected
const allMessages = asyncHandler(async (req, res) => {
  try {
    const messages = await Message.find({ chat: req.params.chatId })
      .populate("sender", "name pic email")
      .populate("chat");
    res.json(messages);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

//@description     Create New Message
//@route           POST /api/Message/
//@access          Protected
const sendMessage = asyncHandler(async (req, res) => {
  const { content, chatId } = req.body;

  if (!content || !chatId) {
    console.log("Invalid data passed into request");
    return res.sendStatus(400);
  }

  var newMessage = {
    sender: req.user._id,
    content: content,
    chat: chatId,
  };

  //Report

  try {
    var message = await Message.create(newMessage);
    const user = await User.findOne({ _id: { $eq: newMessage.sender } });
    const sname = user.email;
    const tempchat = await Chat.findOne({ _id: { $eq: newMessage.chat } });
    const userarr = tempchat.users;
    const recid = userarr.filter((i) => {
      return i.toString() != user._id.toString();
    });
    const rec = await User.findOne({ _id: { $eq: recid } });
    const rname = rec.email;

    const log = await Report.findOne({
      $and: [{ sender: { $eq: sname } }, { receiver: { $eq: rname } }],
    });

    if (!log) {
      await Report.create({ sender: sname, receiver: rname, count: 1 });
    } else {
      await Report.findOneAndUpdate(
        { sender: sname, receiver: rname },
        { count: log.count + 1 }
      );
    }

    //-----------------------------------------------
    message = await message.populate("sender", "name pic").execPopulate();
    message = await message.populate("chat").execPopulate();
    message = await User.populate(message, {
      path: "chat.users",
      select: "name pic email",
    });

    await Chat.findByIdAndUpdate(req.body.chatId, { latestMessage: message });

    res.json(message);
  } catch (error) {
    console.log(error.message);

    res.status(400);
    throw new Error(error.message);
  }
});

module.exports = { allMessages, sendMessage };
