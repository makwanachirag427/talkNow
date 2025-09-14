import express from "express";
import http from "http";
import { Server } from "socket.io";

export const app = express();
export const server = http.createServer(app);
const frontendUrl =
  process.env.NODE_ENV === "development"
    ? process.env.CLIENT_URL
    : "https://talknow-jbol.onrender.com";

export const io = new Server(server, {
  cors: {
    origin: frontendUrl,
  },
});

export const getReceiverSocketId = (receiverId: string): string => {
  return userSocketMap[receiverId];
};

// used to store online users
const userSocketMap: { [userId: string]: string } = {};

io.on("connection", (socket) => {
  console.log("A user connected", socket.id);

  const userId = socket.handshake.query.userId as string;
  if (userId) userSocketMap[userId] = socket.id;

  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    console.log("A user disconnected", socket.id);
    delete userSocketMap[userId];
    io.emit("onlineUsers", Object.keys(userSocketMap));
  });
});
