import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const MONGODB_URI =
      "mongodb+srv://shubhanshu:somu_03@cluster0.4wmqfn0.mongodb.net/";

    // connecting to db
    await mongoose.connect(MONGODB_URI);
    console.log("MongoDB connection successfully");
  } catch (error) {
    console.log("MongoDB connection error: ", error);
    process.exit(1); // exist process with failure
  }
};

export default connectDB;
