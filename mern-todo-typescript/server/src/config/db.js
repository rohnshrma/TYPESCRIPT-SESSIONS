import mongoose from "mongoose";

const connectDB = async (uri) => {
  await mongoose.connect(uri);
  console.log("MongoDB connected");
};

export default connectDB;
