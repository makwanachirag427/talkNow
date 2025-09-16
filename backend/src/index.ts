import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { connectDB } from "./config/db";
import cors from "cors";
import { app, server } from "./config/socket";
// import path from "path";

// routes
import authRoutes from "./routes/auth.route";
import messageRoutes from "./routes/message.route";

dotenv.config();
const PORT = process.env.PORT || 5001;
const frontendUrl = process.env.NODE_ENV === "development" ? process.env.CLIENT_URL : "https://talknow-jbol.onrender.com" 

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin:frontendUrl,
    credentials: true,
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);


server.listen(PORT, () => {
  connectDB();
  console.log(`App listening on port http://localhost:${PORT}`);
});
