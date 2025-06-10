import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import User, { type UserType } from "../models/user.model";
import { Document } from "mongoose";

interface req extends Request {
  user?: UserType;
}

export const protectRoute = async (
  req: req,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      res.status(401).json({ message: "Unauthorized: No token provided" });
      return;
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    if (!decode) {
      res.status(401).json({ message: "Unauthorized: Invalid Token" });
      return;
    }

    const user:UserType = await User.findById(decode.userId).select("-password");
    if (!user) {
      res.status(404).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Unexpected error occurred" });
    }
    console.log("Error in protectRoute middleware ", error);
  }
};
