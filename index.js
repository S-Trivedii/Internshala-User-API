import express from "express";

const app = express();

const router = express.Router();

// Users data
const users = [
  {
    id: 1,
    firstName: "Anshika",
    lastName: "Agarwal",
    hobby: "Teaching",
  },
  {
    id: 2,
    firstName: "Rohit",
    lastName: "Sharma",
    hobby: "Cricket",
  },
  {
    id: 3,
    firstName: "Priya",
    lastName: "Verma",
    hobby: "Painting",
  },
  {
    id: 4,
    firstName: "Amit",
    lastName: "Mishra",
    hobby: "Photography",
  },
  {
    id: 5,
    firstName: "Sneha",
    lastName: "Patel",
    hobby: "Dancing",
  },
  {
    id: 6,
    firstName: "Karan",
    lastName: "Singh",
    hobby: "Football",
  },
  {
    id: 7,
    firstName: "Neha",
    lastName: "Gupta",
    hobby: "Cooking",
  },
  {
    id: 8,
    firstName: "Vikas",
    lastName: "Yadav",
    hobby: "Gaming",
  },
  {
    id: 9,
    firstName: "Aishwarya",
    lastName: "Rai",
    hobby: "Traveling",
  },
  {
    id: 10,
    firstName: "Siddharth",
    lastName: "Malhotra",
    hobby: "Reading",
  },
];

// ----- Application Middleware ------

// For json parsing
app.use(express.json());

// Will run for all request
app.use((req, res, next) => {
  console.log("Method: ", req.method);
  console.log("Url: ", req.url);

  next();
});

// ------- Router Middleware --------

// Will only run for defined request
function validation(req, res, next) {
  // Only validate on POST/PUT routes
  if (req.method === "POST" || req.method === "PUT") {
    if (!req.body.firstName || !req.body.lastName || !req.body.hobby) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // For POST requests only - check ID
    if (req.method === "POST" && !req.body.id) {
      return res.status(400).json({ message: "ID is required" });
    }
  }

  next();
}

// --------- ALL REQUEST ------------------

// 1. Get all users
app.get("/users", (req, res) => {
  try {
    if (users.length === 0) {
      res.status(404).json({
        message: "User does not exist",
      });
    }
    res.status(200).json({
      message: "success",
      users,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
});

// 2. Get single user by id
app.get("/users/:id", (req, res) => {
  try {
    const userId = Number(req.params.id);

    // return a single user
    const user = users.find((user) => user.id === userId);

    // if user exist
    if (user) {
      res.status(200).json({
        message: "success",
        user,
      });
    } else {
      res.status(404).json({
        message: "User not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
});

// 3. Add new user
router.post("/user", validation, (req, res) => {
  try {
    // Converting id to number
    const newUser = { ...req.body, id: Number(req.body.id) };

    // Validation - Check for duplicate ID
    const existingUser = users.find((user) => user.id === newUser.id);
    if (existingUser) {
      return res.status(409).json({ message: "User ID already exists" });
    }

    users.push(newUser);

    res.status(201).json({
      message: "User added successfully",
      user: newUser,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
});

// 4. Update user
router.put("/user/:id", validation, (req, res) => {
  try {
    const userId = Number(req.params.id);

    // Check if user exist
    const user = users.find((user) => user.id === userId);

    // If user doesn't exist
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.hobby = req.body.hobby;

    res.status(200).json({
      message: "User updated successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
});

// Connect the router after defining all router routes
app.use("/", router);

// 5. Delete user
app.delete("/user/:id", (req, res) => {
  try {
    const userId = Number(req.params.id);

    // Find user index
    const userIndex = users.findIndex((user) => user.id === userId);

    if (userIndex === -1) {
      return res.status(404).json({ message: "User not found" });
    }

    // Remove user from array
    const deletedUser = users.splice(userIndex, 1)[0];

    res.status(200).json({
      message: "User deleted successfully",
      user: deletedUser,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
});

// Server Listening on port 3000
app.listen(3000, () => {
  console.log("Listening on port 3000");
});
