import express from "express";
import connectDB from "./db.js";
import { User } from "./userSchema.js";

const app = express();

// For json parsing
app.use(express.json());

// --------- ALL REQUEST ------------------

// 1. Get all users
app.get("/users", async (req, res) => {
  try {
    // returns all documents
    const users = await User.find();

    if (!users) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.status(200).json({
      message: "success",
      users,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
});

// 2. Get single user by id
app.get("/users/:id", async (req, res) => {
  try {
    // user document
    const user = await User.findById(req.params.id);

    // if user document doesn't exist
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.status(200).json({
      message: "User found successfully",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
});

// 3. Add new user
app.post("/user", async (req, res) => {
  try {
    const { firstName, lastName, hobby, email } = req.body;

    if (!firstName || !lastName || !hobby || !email) {
      return res.status(404).json({
        message: "Missing field required",
      });
    }

    // creating document
    const user = new User({ firstName, lastName, hobby, email });

    // saving doucment in db
    const saved = await user.save();

    // User.create() -> create and save document

    return res.status(201).json({
      message: "User successfully saved",
      saved,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
});

// 4. Update user
app.put("/user/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    // If user doesn't exist
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Optional: Check if required fields are in request body (not user)
    const { firstName, lastName, email, hobby } = req.body;
    if (!firstName || !lastName || !email || !hobby) {
      return res.status(400).json({ message: "Missing input field" });
    }

    // Update fields
    user.firstName = firstName;
    user.lastName = lastName;
    user.email = email;
    user.hobby = hobby;

    // Save updated user
    await user.save();

    res.status(200).json({
      message: "User updated successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
});

// 5. Delete user
app.delete("/user/:id", async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "User deleted successfully",
      deletedUser,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
});

// Server Listening on port 3000
app.listen(3000, () => {
  console.log("Listening on port 3000");
  connectDB();
});
