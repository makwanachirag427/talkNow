import mongoose, { Document } from "mongoose";

export interface UserType extends Document {
 fullName: string;
  email: string;
  password: string;
  profilePic?: string; 
  createdAt?: Date; 
  updatedAt?: Date; 
}

const userSchema = new mongoose.Schema<UserType>({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    profilePic: {
        type: String,
        default: "",
    }
}, { timestamps: true });


const User = mongoose.model("User", userSchema);



export default User;