import mongoose from "mongoose";

// user schema with validation
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "First name is required"],
    minLength: [2, "First name must be at least 2 characters"],
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, "Last name is required"],
    minlength: [2, "Last name must be at least 2 characters"],
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  hobby: {
    type: String,
    required: [true, "Hobby is required"],
    default: "reading",
    trim: true,
  },
});

export const User = mongoose.model("User", userSchema);
