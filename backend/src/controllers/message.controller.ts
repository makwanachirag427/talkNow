import { Response } from "express";
import Message from "../models/message.model";
import User from "../models/user.model";
import cloudinary from "../config/cloudinary";
import { getReceiverSocketId, io } from "../config/socket";
import {type req } from "../config/types";

export const usersForSidebar = async (
  req: req,
  res: Response
): Promise<void> => {
  try {
    const loggedInUserId = req.user?._id;
    const users = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");
    res.status(200).json(users);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Unexpected error occurred" });
    }
    console.log("Error in usersForSidebar controller ", error);
  }
};

export const getMessages = async (
  req: req,
  res: Response
): Promise<void> => {
  try {
    const { id: userToChatId } = req.params;
    const myId = req.user?._id;

    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: myId },
      ],
    });

    res.status(200).json(messages);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Unexpected error occurred" });
    }
    console.log("Error in getMessages controller ", error);
  }
};

export const sendMessage = async (
  req: req,
  res: Response
): Promise<void> => {
  try {
    const { text, image } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user?._id;

    let imageUrl;

    if (image) {
      const uploadedResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadedResponse.secure_url;
    }

    const newMessage = new Message({
      text,
      image: imageUrl,
      receiverId,
      senderId,
    });

    await newMessage.save();

    //TODO : realtime functionality goes here
    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    res.status(201).json(newMessage);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Unexpected error occurred" });
    }
    console.log("Error in sendMessage controller ", error);
  }
};
