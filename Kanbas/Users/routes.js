import * as dao from "./dao.js";

let currentUser = null; // Tracks logged-in user

export default function UserRoutes(app) {
  app.get("/api/users", (req, res) => {
    const users = dao.findAllUsers();
    res.json(users);
  });

  app.get("/api/users/:id", (req, res) => {
    const user = dao.findUserById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  });

  app.post("/api/users", (req, res) => {
    const newUser = dao.createUser(req.body);
    res.status(201).json(newUser);
  });

  app.put("/api/users/:id", (req, res) => {
    const updatedUser = dao.updateUser(req.params.id, req.body);
    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(updatedUser);
  });

  app.delete("/api/users/:id", (req, res) => {
    const deleted = dao.deleteUser(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: "User not found" });
    }
    res.sendStatus(204);
  });

  // Sign-in route
  app.post("/kanbas/signin", (req, res) => {
    const { username, password } = req.body;

    const user = dao.findUserByCredentials(username, password);

    if (!user) {
      // If no user is found, return 401 Unauthorized
      return res.status(401).json({ message: "Invalid username or password" });
    }

    // If user is found, return the user object
    res.json(user);
  });


  // Sign-up route
  app.post("/api/users/signup", (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: "Username and password are required." });
    }

    // Check if the username is already taken using the DAO
    const existingUser = dao.findUserByUsername(username);
    if (existingUser) {
      return res.status(400).json({ message: "Username already in use." });
    }

    // Create a new user using the DAO
    const newUser = dao.createUser({ username, password, role: "USER" });

    // Respond with the newly created user
    res.status(201).json(newUser);
  });

  // Fetch user profile
  app.get("/kanbas/profile", (req, res) => {
    if (!currentUser) {
      return res.status(401).json({ message: "No user is currently logged in." });
    }
    res.json(currentUser);
  });

  // Update user profile
  app.put("/kanbas/profile", (req, res) => {
    if (!currentUser) {
      return res.status(401).json({ message: "No user is currently logged in." });
    }
    const updates = req.body;
    currentUser = { ...currentUser, ...updates }; // Update in-memory user data
    dao.updateUser(currentUser._id, currentUser); // Reflect changes in the mock database
    res.json(currentUser);
  });
}
