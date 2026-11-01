import mongoose from "mongoose";

const connectDB = async (uri: string): Promise<void> => {
  await mongoose.connect(uri);
  console.log("MongoDB connected");
};

export default connectDB;
