import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectDB = async () => {
    try {
      const conn = await mongoose.connect(process.env.MONGO_URI!, {
        dbName: process.env.DB_NAME || "ott-mylist",
      });
      console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
      console.error("MongoDB connection failed:", error);
      process.exit(1); // Exit process with failure
    }
  };
  
  export default connectDB