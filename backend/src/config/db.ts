import mongoose from "mongoose";



export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI!);
        console.log("Database connected successfully with", conn.connection.host);

    } catch (error) {
        console.error("Error while connecting with database ", error);
        process.exit(1);
    }
}