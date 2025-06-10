import { Request } from "express";
import { Document } from "mongoose";

export interface UserType extends Document {
  fullName: string;
  email: string;
  password: string;
  profilePic?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface req extends Request {
  user?: UserType;
}
